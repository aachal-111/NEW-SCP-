// src/components/ClassBadge.jsx
// Renders the object-class badge with correct colour styling.

// Maps each class to a CSS class and a symbol prefix
const CLASS_MAP = {
  Safe:      { cls: 'badge-safe',     symbol: '▲' },
  Euclid:    { cls: 'badge-euclid',   symbol: '◆' },
  Keter:     { cls: 'badge-keter',    symbol: '✕' },
  Thaumiel:  { cls: 'badge-thaumiel', symbol: '⬡' },
  Apollyon:  { cls: 'badge-apollyon', symbol: '☣' },
}

export default function ClassBadge({ objectClass }) {
  const { cls, symbol } = CLASS_MAP[objectClass] || { cls: 'badge-safe', symbol: '?' }
  return (
    <span className={`badge ${cls}`}>
      {symbol} {objectClass}
    </span>
  )
}
