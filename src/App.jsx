// src/App.jsx
// Root component. Sets up React Router routes and wraps everything
// in the Navbar + Footer shell.

import { Routes, Route, Link } from 'react-router-dom'
import Navbar      from './components/Navbar'
import SCPGrid     from './components/SCPGrid'
import EntryDetail from './components/EntryDetail'
import EntryForm   from './components/EntryForm'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Archive listing */}
          <Route path="/"                   element={<SCPGrid />} />

          {/* Detail view */}
          <Route path="/subject/:id"        element={<EntryDetail />} />

          {/* Edit form */}
          <Route path="/subject/:id/edit"   element={<EntryForm />} />

          {/* New entry form */}
          <Route path="/new"                element={<EntryForm />} />

          {/* 404 */}
          <Route path="*" element={
            <main className="page-sm" style={{ textAlign: 'center', paddingTop: '5rem' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '48px', opacity: .15, marginBottom: '1rem' }}>⊘</p>
              <h2 style={{ fontFamily: 'var(--serif)', marginBottom: '.5rem' }}>File Not Found</h2>
              <p style={{ marginBottom: '1.5rem' }}>This record has been expunged or does not exist.</p>
              <Link to="/" className="btn btn-outline">← Return to Archive</Link>
            </main>
          } />
        </Routes>
      </div>

      <footer className="footer">
        SCP FOUNDATION SECURE DATABASE — COMP.6210 ASSIGNMENT 2 — CLASSIFIED — DO NOT DISTRIBUTE
      </footer>
    </div>
  )
}
