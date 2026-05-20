import { useState, useEffect, useCallback } from 'react'
import CustomerForm from '../components/CustomerForm'
import CustomerTable from '../components/CustomerTable'
import {
  getCustomers, createCustomer, updateCustomer,
  deleteCustomer, updateStatus
} from '../api/customerApi'

export default function HomePage() {
  const [customers, setCustomers] = useState([])
  const [editData, setEditData] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)
    try {
      const params = { page, limit: 10 }
      if (search) params.search = search
      if (statusFilter) params.status = statusFilter
      const res = await getCustomers(params)
      setCustomers(res.data.data)
      setPagination(res.data.pagination)
    } catch (e) {
      setError('Không thể tải danh sách. Vui lòng kiểm tra kết nối.')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => {
    const timer = setTimeout(() => load(1), 300)
    return () => clearTimeout(timer)
  }, [load])

  const handleSubmit = async (form) => {
    try {
      if (editData) {
        await updateCustomer(editData._id, form)
        setEditData(null)
      } else {
        await createCustomer(form)
      }
      load(1)
    } catch (e) {
      setError(e.response?.data?.message || 'Lỗi khi lưu dữ liệu')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Xác nhận xóa khách hàng này?')) return
    try {
      await deleteCustomer(id)
      load(pagination.page)
    } catch {
      setError('Lỗi khi xóa')
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status)
      load(pagination.page)
    } catch {
      setError('Lỗi khi cập nhật trạng thái')
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#111827' }}>🏢 Simple CRM</h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>Quản lý khách hàng đơn giản</p>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', color: '#dc2626' }}>
          ⚠️ {error}
          <button onClick={() => setError(null)} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>✕</button>
        </div>
      )}

      {/* Form */}
      <CustomerForm onSubmit={handleSubmit} editData={editData} onCancel={() => setEditData(null)} />
{/* Search + Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          placeholder="🔍 Tìm theo tên, email, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="tiem_nang">Tiềm năng</option>
          <option value="da_lien_he">Đã liên hệ</option>
          <option value="than_thiet">Thân thiết</option>
        </select>
      </div>

      {/* Stats */}
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
        Tổng: <strong>{pagination.total}</strong> khách hàng
        {loading && ' — Đang tải...'}
      </p>

      {/* Table */}
      <CustomerTable
        customers={customers}
        onEdit={setEditData}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => load(p)}
              style={{
                margin: '0 4px', padding: '6px 12px', border: '1px solid #d1d5db',
                borderRadius: '4px', background: p === pagination.page ? '#3b82f6' : 'white',
                color: p === pagination.page ? 'white' : '#374151', cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
