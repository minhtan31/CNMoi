import StatusBadge from './StatusBadge'

export default function CustomerTable({ customers, onEdit, onDelete, onStatusChange }) {
  const thStyle = {
    background: '#374151', color: 'white', padding: '10px 14px',
    textAlign: 'left', fontSize: '13px',
  }
  const tdStyle = { padding: '10px 14px', borderBottom: '1px solid #e5e7eb', fontSize: '14px' }

  if (customers.length === 0) {
    return <p style={{ textAlign: 'center', color: '#9ca3af' }}>Không có khách hàng nào.</p>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      <thead>
        <tr>
          <th style={thStyle}>Tên</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>SĐT</th>
          <th style={thStyle}>Trạng thái</th>
          <th style={thStyle}>Ghi chú</th>
          <th style={thStyle}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c._id} style={{ background: 'white' }}>
            <td style={tdStyle}><strong>{c.name}</strong></td>
            <td style={tdStyle}>{c.email}</td>
            <td style={tdStyle}>{c.phone}</td>
            <td style={tdStyle}>
              <select
                value={c.status}
                onChange={(e) => onStatusChange(c._id, e.target.value)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <option value="tiem_nang">Tiềm năng</option>
                <option value="da_lien_he">Đã liên hệ</option>
                <option value="than_thiet">Thân thiết</option>
              </select>
              <StatusBadge status={c.status} />
            </td>
            <td style={tdStyle}>{c.notes || '—'}</td>
            <td style={tdStyle}>
              <button
                onClick={() => onEdit(c)}
                style={{ marginRight: '6px', padding: '4px 10px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Sửa
              </button>
              <button
                onClick={() => onDelete(c._id)}
                style={{ padding: '4px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}