import { useState, useEffect } from 'react';
import { API_BASE_URL as API } from '../config/api';

interface Enquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message?: string;
    created_at: string;
}

const AdminEnquiries = ({ token }: { token: string }) => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchEnquiries = () => {
        setLoading(true);
        fetch(`${API}/admin/enquiries`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) setEnquiries(data.enquiries);
            })
            .catch(err => console.error('Failed to fetch enquiries:', err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchEnquiries();
    }, [token]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this enquiry?')) return;
        try {
            const res = await fetch(`${API}/admin/enquiries/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnquiries(enquiries.filter(e => e.id !== id));
            } else {
                alert(data.message || 'Failed to delete enquiry');
            }
        } catch (e) {
            alert('Server error deleting enquiry');
        }
    };

    const exportCsv = async () => {
        try {
            const res = await fetch(`${API}/admin/enquiries/export`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'enquiries.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            alert('Failed to export enquiries');
        }
    };

    const filtered = enquiries.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search) ||
        (e.message && e.message.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ color: '#1e3a5f', margin: 0 }}>Guest Enquiries ({enquiries.length})</h2>
                    <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                        View, search, and manage incoming guest booking inquiries and messages.
                    </p>
                </div>
                <button
                    onClick={exportCsv}
                    style={{
                        background: '#059669', color: 'white', border: 'none',
                        padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer',
                        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    📥 Export CSV
                </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="🔍 Search enquiries by name, email, phone, or message..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                        border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none'
                    }}
                />
            </div>

            {loading ? (
                <p style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading enquiries...</p>
            ) : filtered.length === 0 ? (
                <div style={{ background: 'white', padding: '3rem', textAlign: 'center', borderRadius: '12px', color: '#64748b' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📩</div>
                    <h3>No Enquiries Found</h3>
                    <p style={{ fontSize: '0.9rem' }}>Guest booking enquiries submitted through the website will appear here.</p>
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                                <th style={{ padding: '1rem' }}>Date & Time</th>
                                <th style={{ padding: '1rem' }}>Guest Details</th>
                                <th style={{ padding: '1rem' }}>Contact Actions</th>
                                <th style={{ padding: '1rem' }}>Message</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(item => {
                                const cleanPhone = item.phone.replace(/[^0-9]/g, '');
                                const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}`;

                                return (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                                            {new Date(item.created_at).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.email}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <a
                                                    href={waUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                        background: '#25D366', color: 'white', padding: '0.35rem 0.75rem',
                                                        borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                                                        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                    }}
                                                >
                                                    💬 WhatsApp
                                                </a>
                                                <a
                                                    href={`mailto:${item.email}`}
                                                    style={{
                                                        background: '#2563eb', color: 'white', padding: '0.35rem 0.75rem',
                                                        borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                                                        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                    }}
                                                >
                                                    ✉️ Email
                                                </a>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#334155', maxWidth: '300px' }}>
                                            {item.message || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No message provided</span>}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                style={{
                                                    background: '#ef4444', color: 'white', border: 'none',
                                                    padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer',
                                                    fontSize: '0.8rem', fontWeight: '600'
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminEnquiries;
