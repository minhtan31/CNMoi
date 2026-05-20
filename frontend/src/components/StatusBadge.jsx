const STATUS_MAP = {
  tiem_nang: { label: 'Tiềm năng', color: '#f59e0b' },
  da_lien_he: { label: 'Đã liên hệ', color: '#3b82f6' },
  than_thiet: { label: 'Thân thiết', color: '#10b981' },
}

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { label: status, color: '#6b7280' }
  return (
    <span style={{
      background: s.color,
      color: 'white',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      {s.label}
    </span>
  )
}