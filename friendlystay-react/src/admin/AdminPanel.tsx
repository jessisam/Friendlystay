import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminReviews from './AdminReviews';
import AdminProperties from './AdminProperties';

import { API_BASE_URL as API } from '../config/api';

type Page = 'dashboard' | 'reviews' | 'properties';

const AdminPanel = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
    const [page, setPage] = useState<Page>('dashboard');

    const handleLogin = (t: string) => setToken(t);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        setToken(null);
    };

    const exportEnquiries = async () => {
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

    if (!token) return <AdminLogin onLogin={handleLogin} />;

    const navItems: { key: Page; label: string; icon: string }[] = [
        { key: 'dashboard', label: 'Dashboard', icon: '📊' },
        { key: 'reviews', label: 'Reviews', icon: '⭐' },
        { key: 'properties', label: 'Properties', icon: '🏠' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
            {/* Sidebar */}
            <div style={{
                width: '260px', background: 'linear-gradient(180deg, #1e3a5f 0%, #2563eb 100%)',
                color: 'white', display: 'flex', flexDirection: 'column',
                position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px', height: '40px', background: 'white', borderRadius: '8px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#2563eb', fontWeight: '700', fontSize: '0.9rem'
                        }}>FS</div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1rem' }}>FriendlyStay</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Admin Panel</div>
                        </div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1rem' }}>
                    {navItems.map(item => (
                        <button key={item.key} onClick={() => setPage(item.key)} style={{
                            width: '100%', padding: '0.75rem 1rem',
                            background: page === item.key ? 'rgba(255,255,255,0.2)' : 'transparent',
                            border: 'none', borderRadius: '8px', color: 'white',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            cursor: 'pointer', fontSize: '0.95rem', fontWeight: page === item.key ? '600' : '400',
                            marginBottom: '0.25rem', textAlign: 'left'
                        }}>
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}

                    <button onClick={exportEnquiries} style={{
                        width: '100%', padding: '0.75rem 1rem',
                        background: 'transparent', border: 'none', borderRadius: '8px',
                        color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem',
                        cursor: 'pointer', fontSize: '0.95rem', marginBottom: '0.25rem', textAlign: 'left'
                    }}>
                        <span>📥</span> Export Enquiries
                    </button>
                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={handleLogout} style={{
                        width: '100%', padding: '0.75rem',
                        background: 'rgba(255,255,255,0.1)', border: 'none',
                        borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '500'
                    }}>🚪 Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
                {page === 'dashboard' && <AdminDashboard token={token} />}
                {page === 'reviews' && <AdminReviews token={token} />}
                {page === 'properties' && <AdminProperties token={token} />}
            </div>
        </div>
    );
};

export default AdminPanel;