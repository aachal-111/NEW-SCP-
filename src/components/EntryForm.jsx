// src/components/EntryForm.jsx
// Shared form used for both CREATE (new entry) and UPDATE (edit existing).
// Detects edit mode from the URL param :id.
// CREATE — Supabase REST: POST /rest/v1/scp_subjects
// UPDATE — Supabase REST: PATCH /rest/v1/scp_subjects?id=eq.{id}

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const EMPTY_FORM = {
  item_number:  '',
  object_class: 'Safe',
  description:  '',
  containment:  '',
}

export default function EntryForm() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const isEdit    = Boolean(id)

  const [form,    setForm]    = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(isEdit)   // load existing data if editing
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState(null)

  // Populate form when editing an existing record
  useEffect(() => {
    if (!isEdit) return
    supabase
      .from('scp_subjects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else       setForm({ item_number: data.item_number, object_class: data.object_class, description: data.description, containment: data.containment })
        setLoading(false)
      })
  }, [id])

  // Generic field change handler
  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Form submit — branches on isEdit
  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!form.item_number.trim()) { setError('Item number is required.'); return }
    if (!form.description.trim()) { setError('Description is required.'); return }
    if (!form.containment.trim()) { setError('Containment procedures are required.'); return }

    setSaving(true)

    let result
    if (isEdit) {
      // UPDATE — PATCH the existing row by id
      result = await supabase
        .from('scp_subjects')
        .update(form)
        .eq('id', id)
    } else {
      // CREATE — INSERT a new row
      result = await supabase
        .from('scp_subjects')
        .insert([form])
    }

    setSaving(false)

    if (result.error) {
      setError(result.error.message)
    } else {
      navigate(isEdit ? `/subject/${id}` : '/')
    }
  }

  if (loading) return (
    <div className="page-sm">
      <div className="spinner-wrap">
        <div className="spinner" />
        <span className="spinner-label">Loading file…</span>
      </div>
    </div>
  )

  return (
    <main className="page-sm">
      {/* Breadcrumb */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Archive</Link>
          <span>›</span>
          {isEdit && <><Link to={`/subject/${id}`}>Entry</Link><span>›</span></>}
          <span>{isEdit ? 'Edit' : 'New Entry'}</span>
        </div>
        <h1>{isEdit ? 'Amend File' : 'New SCP Entry'}</h1>
        <p style={{ marginTop: '4px' }}>
          {isEdit
            ? 'Update the containment file. All changes are logged.'
            : 'Register a new anomalous entity in the Foundation archive.'}
        </p>
      </div>

      <div className="form-card">
        <div className="form-card-head">
          <span style={{ fontSize: '18px' }}>📄</span>
          <h2>{isEdit ? 'AMEND CONTAINMENT FILE' : 'NEW CONTAINMENT FILE'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-body">
            {error && (
              <div style={{
                background: 'var(--red-light)',
                border: '1px solid var(--red-mid)',
                borderLeft: '3px solid var(--red)',
                borderRadius: 'var(--radius)',
                padding: '.75rem 1rem',
                fontSize: '13px',
                color: 'var(--red)',
                marginBottom: '1.2rem',
                fontFamily: 'var(--mono)',
              }}>
                ⚠ {error}
              </div>
            )}

            <div className="form-row">
              <div className="field">
                <label htmlFor="item_number">Item Number</label>
                <input
                  id="item_number"
                  name="item_number"
                  type="text"
                  placeholder="e.g. SCP-173"
                  value={form.item_number}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="object_class">Object Class</label>
                <select
                  id="object_class"
                  name="object_class"
                  value={form.object_class}
                  onChange={onChange}
                >
                  <option value="Safe">Safe</option>
                  <option value="Euclid">Euclid</option>
                  <option value="Keter">Keter</option>
                  <option value="Thaumiel">Thaumiel</option>
                  <option value="Apollyon">Apollyon</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the anomalous entity, its appearance, behaviour, and known properties…"
                value={form.description}
                onChange={onChange}
                style={{ minHeight: '130px' }}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="containment">Special Containment Procedures</label>
              <textarea
                id="containment"
                name="containment"
                placeholder="Detail the procedures required to safely contain the entity…"
                value={form.containment}
                onChange={onChange}
                style={{ minHeight: '130px' }}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <Link
              to={isEdit ? `/subject/${id}` : '/'}
              className="btn btn-outline"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Filing…' : isEdit ? '✓ Save Changes' : '✓ Submit Entry'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
