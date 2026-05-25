// src/components/EntryDetail.jsx
// Displays the full detail file for a single SCP subject.
// Fetches one record by ID from Supabase (READ by ID).

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import ClassBadge from './ClassBadge'

export default function EntryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [subject, setSubject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => { fetchOne() }, [id])

  // READ single — Supabase REST: GET /rest/v1/scp_subjects?id=eq.{id}&select=*
  async function fetchOne() {
    setLoading(true)
    const { data, error } = await supabase
      .from('scp_subjects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) setError(error.message)
    else       setSubject(data)
    setLoading(false)
  }

  // DELETE — Supabase REST: DELETE /rest/v1/scp_subjects?id=eq.{id}
  async function handleDelete() {
    if (!window.confirm(`Permanently expunge ${subject.item_number}?`)) return
    const { error } = await supabase.from('scp_subjects').delete().eq('id', id)
    if (error) alert('Delete failed: ' + error.message)
    else       navigate('/')
  }

  if (loading) return (
    <div className="page-sm">
      <div className="spinner-wrap">
        <div className="spinner" />
        <span className="spinner-label">Decrypting file…</span>
      </div>
    </div>
  )

  if (error || !subject) return (
    <div className="page-sm">
      <div className="state-box">
        <div className="state-icon">⊘</div>
        <p className="state-title">File Not Found</p>
        <p className="state-sub">This record may have been expunged.</p>
        <Link to="/" className="btn btn-outline mt-2">Return to Archive</Link>
      </div>
    </div>
  )

  return (
    <main className="page">
      {/* Breadcrumb */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Archive</Link>
          <span>›</span>
          <span>{subject.item_number}</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1>{subject.item_number}</h1>
            <p style={{ marginTop: '6px' }}>Foundation Special Containment Procedures File</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/subject/${id}/edit`)}
            >
              Edit File
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Expunge
            </button>
          </div>
        </div>
      </div>

      <div className="detail-wrapper">
        {/* Main content */}
        <div className="detail-card">
          <div className="detail-card-header">
            <div>
              <div className="detail-scp-num">Item №</div>
              <div className="detail-scp-title">{subject.item_number}</div>
            </div>
            <ClassBadge objectClass={subject.object_class} />
          </div>
          <div className="detail-body">
            <div className="detail-section">
              <div className="detail-section-label">Description</div>
              <p className="detail-section-text">{subject.description}</p>
            </div>
            <div className="detail-section">
              <div className="detail-section-label">Special Containment Procedures</div>
              <p className="detail-section-text">{subject.containment}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sidebar-card">
            <div className="sidebar-card-head">Classification</div>
            <div className="sidebar-card-body">
              <div className="sidebar-row">
                <span className="sidebar-row-label">Item №</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: '600' }}>
                  {subject.item_number}
                </span>
              </div>
              <div className="sidebar-row">
                <span className="sidebar-row-label">Object Class</span>
                <ClassBadge objectClass={subject.object_class} />
              </div>
              <div className="sidebar-row">
                <span className="sidebar-row-label">Clearance</span>
                <span style={{ fontSize: '13px' }}>Level 4</span>
              </div>
              <div className="sidebar-row">
                <span className="sidebar-row-label">Site</span>
                <span style={{ fontSize: '13px' }}>Site-██</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card-head">Documentation</div>
            <div className="sidebar-card-body">
              <div className="sidebar-row">
                <span className="sidebar-row-label">Author</span>
                <span className="redact">████████</span>
              </div>
              <div className="sidebar-row">
                <span className="sidebar-row-label">Reviewed by</span>
                <span className="redact">████</span>
              </div>
              <div className="sidebar-row">
                <span className="sidebar-row-label">Status</span>
                <span style={{ fontSize: '12px', color: 'var(--green)', fontFamily: 'var(--mono)', fontWeight: '600' }}>
                  ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--ink-faint)', fontFamily: 'var(--mono)', lineHeight: '1.6', padding: '0 .25rem' }}>
            ⚠ This file is classified. Unauthorised access or distribution is a violation of Foundation protocol O5-7.
          </div>
        </div>
      </div>
    </main>
  )
}
