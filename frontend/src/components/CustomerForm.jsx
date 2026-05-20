import { useState, useEffect } from 'react'

const INITIAL = { name: '', email: '', phone: '', address: '', status: 'tiem_nang', notes: '' }
const STATUS_OPTIONS = [
  { value: 'tiem_nang', label: 'Tiềm năng' },
  { value: 'da_lien_he', label: 'Đã liên hệ' },
  { value: 'than_thiet', label: 'Thân thiết' },
]

export default function CustomerForm({ onSubmit, editData, onCancel }) {
  const [form, setForm] = useState(INITIAL)

  useEffect(() => {
    if (editData) setForm(editData)
    else setForm(INITIAL)
  }, [editData])

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const inputStyle = {
    width: '100%', padding: '8px 12px', border: '1px solid #d1d5db',
    borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box',
  }

  return (
    <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
      <h3 style={{ marginTop: 0 }}>{editData ? '✏️ Cập nhật khách hàng' : '➕ Thêm khách hàng mới'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label>Tên *</label>
          <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" />
        </div>
        <div>
          <label>Email *</label>
          <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" />
        </div>
        <div>
          <label>Số điện thoại *</label>
          <input style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="+84908123456" />
        </div>
        <div>
          <label>Địa chỉ</label>
          <input style={inputStyle} value={form.address} onChange={set('address')} placeholder="123 Nguyễn Huệ, Q1" />
        </div>
        <div>
          <label>Trạng thái</label>
          <select style={inputStyle} value={form.status} onChange={set('status')}>
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label>Ghi chú</label>
          <input style={inputStyle} value={form.notes} onChange={set('notes')} placeholder="Ghi chú..." />
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onSubmit(form)}
          style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}
        >
          {editData ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editData && (
          <button
            onClick={onCancel}
            style={{ background: '#6b7280', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  )
}