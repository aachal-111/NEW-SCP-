// src/components/SCPGrid.jsx
// Main archive listing page.
// Fetches all SCP subjects from Supabase (READ), renders them as cards,
// and supports live search + filter by object class.

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import ClassBadge from './ClassBadge'

export default function SCPGrid() {
  // ── State ────────────────────────────────────────────────────────────────
  const [subjects,  setSubjects]  = useState([])   // all records from DB
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [search,    setSearch]    = useState('')   // free-text filter
  const [classFilter, setClass]   = useState('All') // object-class dropdown

  const navigate = useNavigate()

  // ── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => { fetchAll() }, [])

  // READ — Supabase REST: GET /rest/v1/scp_subjects?select=*&order=item_number
  async function fetchAll() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('scp_subjects')
      .select('*')
      .order('item_number', { ascending: true })

    if (error) setError(error.message)
    else       setSubjects(data)
    setLoading(false)
  }

  // DELETE — Supabase REST: DELETE /rest/v1/scp_subjects?id=eq.{id}
  async function handleDelete(e, id) {
    e.stopPropagation() // prevent card click navigating away
    if (!window.confirm('Permanently remove this SCP entry?')) return
    const { error } = await supabase.from('scp_subjects').delete().eq('id', id)
    if (error) alert('Delete failed: ' + error.message)
    else       fetchAll()
  }

  // ── Derived filtered list ────────────────────────────────────────────────
  const filtered = subjects.filter(s => {
    const q = search.toLowerCase()
    const matchText =
      s.item_number.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.containment.toLowerCase().includes(q)
    const matchClass = classFilter === 'All' || s.object_class === classFilter
    return matchText && matchClass
  })

  // ── Class counts for stats bar ───────────────────────────────────────────
  const counts = subjects.reduce((acc, s) => {
    acc[s.object_class] = (acc[s.object_class] || 0) + 1
    return acc
  }, {})

  // ── Render ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="page">
      <div className="spinner-wrap">
        <div className="spinner" />
        <span className="spinner-label">Accessing secure archive…</span>
      </div>
    </div>
  )

  if (error) return (
    <div className="page">
      <div className="state-box">
        <div className="state-icon">!</div>
        <p className="state-title">Database Error</p>
        <p className="state-sub">{error}</p>
        <button className="btn btn-outline mt-2" onClick={fetchAll}>Retry</button>
      </div>
    </div>
  )

  return (
    <main className="page">
      {/* Page heading */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1>SCP Archive</h1>
            <p style={{ marginTop: '4px' }}>
              Classified anomalous entities — Foundation personnel only.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/new')}>
            + Add Entry
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="stats-bar">
        {[
          { label: 'Total',    val: subjects.length,         color: 'var(--ink)' },
          { label: 'Safe',     val: counts['Safe']     || 0, color: 'var(--green)' },
          { label: 'Euclid',   val: counts['Euclid']   || 0, color: 'var(--amber)' },
          { label: 'Keter',    val: counts['Keter']    || 0, color: 'var(--red)' },
          { label: 'Thaumiel', val: counts['Thaumiel'] || 0, color: 'var(--purple)' },
        ].map(({ label, val, color }) => (
          <div key={label} className="stat-cell">
            <div className="stat-num" style={{ color }}>{val}</div>
            <div className="stat-lbl">{label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          {/* Search icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search by number, description or containment…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={classFilter}
          onChange={e => setClass(e.target.value)}
        >
          <option value="All">All Classes</option>
          <option value="Safe">Safe</option>
          <option value="Euclid">Euclid</option>
          <option value="Keter">Keter</option>
          <option value="Thaumiel">Thaumiel</option>
          <option value="Apollyon">Apollyon</option>
        </select>
      </div>

      {/* Results count */}
      <p style={{ fontSize: '12px', color: 'var(--ink-faint)', marginBottom: '1rem', fontFamily: 'var(--mono)' }}>
        {filtered.length === subjects.length
          ? `Showing all ${subjects.length} entries`
          : `Showing ${filtered.length} of ${subjects.length} entries`}
      </p>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="state-box">
          <div className="state-icon">∅</div>
          <p className="state-title">No records found</p>
          <p className="state-sub">Try a different search term or class filter.</p>
        </div>
      ) : (
        /* Card grid */
        <div className="card-grid">
          {filtered.map(subject => (
            <article
              key={subject.id}
              className="scp-card"
              onClick={() => navigate(`/subject/${subject.id}`)}
            >
              <div className="scp-card-head">
                <span className="scp-card-num">{subject.item_number}</span>
                <ClassBadge objectClass={subject.object_class} />
              </div>
              <div className="scp-card-body">
                <p className="scp-card-desc">{subject.description}</p>
              </div>
              <div className="scp-card-foot">
                <span style={{ fontSize: '11px', color: 'var(--ink-faint)', fontFamily: 'var(--mono)' }}>
                  View file →
                </span>
                <div className="scp-card-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={e => { e.stopPropagation(); navigate(`/subject/${subject.id}/edit`) }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={e => handleDelete(e, subject.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
