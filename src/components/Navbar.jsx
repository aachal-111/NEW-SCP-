// src/components/Navbar.jsx
// Top navigation bar — sticky, dark, with red accent border.
// Shows the SCP logo mark, title, and a quick "New Entry" button.

import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">SCP</div>
        <div>
          <div className="navbar-title">Foundation Archive</div>
          <div className="navbar-sub">Secure · Contain · Protect</div>
        </div>
      </Link>

      {/* Actions */}
      <div className="navbar-actions">
        <Link to="/" className="btn btn-ghost btn-sm">All Entries</Link>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/new')}
        >
          + New Entry
        </button>
      </div>
    </nav>
  )
}
