import { useState, useEffect } from 'react';

import { API_BASE_URL as API } from '../config/api';

interface Stats {
    totalEnquiries: number;
    weekEnquiries: number;
    pendingReviews: number;
    approvedReviews: number;
    totalReviews: number;
}

const AdminDashboard = ({ token }: { token: string }) => {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch(`${API}/admin/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => { if (data.success) setStats(data.stats); });
    }, [token]);

    const cards = stats ? [
        { label: 'Enquiries This Week', value: stats.weekEnquiries, icon: '📩', color: '#2563eb' },
        { label: 'Total Enquiries', value: stats.totalEnquiries, icon: '📋', color: '#7c3aed' },
        { label: 'Pending Reviews', value: stats.pendingReviews, icon: '⏳', color: '#d97706' },
        { label: 'Approved Reviews', value: stats.approvedReviews, icon: '✅', color: '#059669' },
    ] : [];

    return (
        <div>
            <h2 style={{ marginBottom: '1.5rem', color: '#1e3a5f' }}>Dashboard Overview</h2>
            {!stats ? (
                <p>Loading stats...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {cards.map((card, i) => (
                        <div key={i} style={{
                            background: 'white', borderRadius: '12px',
                            padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            borderLeft: `4px solid ${card.color}`
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.icon}</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: card.color }}>
                                {card.value}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                {card.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;