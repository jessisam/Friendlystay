import { useState, useEffect, useCallback } from 'react';

import { API_BASE_URL as API } from '../config/api';

interface Review {
    id: number;
    name: string;
    rating: number;
    review: string;
    approved: boolean;
    admin_reply: string | null;
    property: string | null;
    created_at: string;
}

const AdminReviews = ({ token }: { token: string }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
    const [actionMsg, setActionMsg] = useState('');

    const authHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const fetchReviews = useCallback(() => {
        setLoading(true);
        fetch(`${API}/admin/reviews`, { headers: authHeaders })
            .then(r => r.json())
            .then(data => {
                if (data.success) setReviews(data.reviews);
            })
            .catch(err => console.error('Fetch error:', err))
            .finally(() => setLoading(false));
    }, [token]);

    useEffect(() => { fetchReviews(); }, [fetchReviews]);

    const showMsg = (msg: string) => {
        setActionMsg(msg);
        setTimeout(() => setActionMsg(''), 3000);
    };

    const approve = async (id: number) => {
        try {
            const res = await fetch(`${API}/admin/reviews/${id}/approve`, {
                method: 'PUT',
                headers: authHeaders
            });
            const data = await res.json();
            if (data.success) { showMsg('✅ Review approved!'); fetchReviews(); }
            else showMsg('❌ Failed: ' + data.message);
        } catch (e) {
            console.error(e);
            showMsg('❌ Network error');
        }
    };

    const reject = async (id: number) => {
        try {
            const res = await fetch(`${API}/admin/reviews/${id}/reject`, {
                method: 'PUT',
                headers: authHeaders
            });
            const data = await res.json();
            if (data.success) { showMsg('⚠️ Review unpublished'); fetchReviews(); }
            else showMsg('❌ Failed: ' + data.message);
        } catch (e) {
            console.error(e);
            showMsg('❌ Network error');
        }
    };

    const deleteReview = async (id: number) => {
        if (!window.confirm('Delete this review permanently?')) return;
        try {
            const res = await fetch(`${API}/admin/reviews/${id}`, {
                method: 'DELETE',
                headers: authHeaders
            });
            const data = await res.json();
            if (data.success) { showMsg('🗑️ Review deleted'); fetchReviews(); }
            else showMsg('❌ Failed: ' + data.message);
        } catch (e) {
            console.error(e);
            showMsg('❌ Network error');
        }
    };

    const submitReply = async (id: number) => {
        const reply = replyText[id];
        if (!reply?.trim()) return;
        try {
            const res = await fetch(`${API}/admin/reviews/${id}/reply`, {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify({ reply })
            });
            const data = await res.json();
            if (data.success) {
                showMsg('💬 Reply saved!');
                setReplyText(prev => ({ ...prev, [id]: '' }));
                fetchReviews();
            } else showMsg('❌ Failed: ' + data.message);
        } catch (e) {
            console.error(e);
            showMsg('❌ Network error');
        }
    };

    const filtered = reviews.filter(r => {
        if (filter === 'pending') return !r.approved;
        if (filter === 'approved') return r.approved;
        return true;
    });

    const renderStars = (rating: number) =>
        Array(5).fill(0).map((_, i) => (
            <span key={i} style={{ color: i < rating ? '#f59e0b' : '#d1d5db' }}>★</span>
        ));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#1e3a5f' }}>Reviews Management</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {(['all', 'pending', 'approved'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                            cursor: 'pointer', fontWeight: '500',
                            background: filter === f ? '#2563eb' : '#e2e8f0',
                            color: filter === f ? 'white' : '#374151'
                        }}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {actionMsg && (
                <div style={{
                    padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem',
                    background: '#eff6ff', color: '#2563eb', fontWeight: '500'
                }}>{actionMsg}</div>
            )}

            {loading ? <p>Loading reviews...</p> : filtered.length === 0 ? (
                <p style={{ color: '#64748b' }}>No reviews found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filtered.map(review => (
                        <div key={review.id} style={{
                            background: 'white', borderRadius: '12px',
                            padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            borderLeft: `4px solid ${review.approved ? '#059669' : '#d97706'}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: '#2563eb', color: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: '700', fontSize: '0.9rem', flexShrink: 0
                                        }}>
                                            {review.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1e3a5f' }}>{review.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                {review.property || 'FriendlyStay'} • {new Date(review.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '0.5rem' }}>{renderStars(review.rating)}</div>
                                    <p style={{ color: '#374151', margin: '0.5rem 0' }}>{review.review}</p>

                                    {review.admin_reply && (
                                        <div style={{
                                            background: '#eff6ff', borderRadius: '8px',
                                            padding: '0.75rem', marginTop: '0.75rem',
                                            borderLeft: '3px solid #2563eb'
                                        }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.25rem' }}>
                                                Admin Reply:
                                            </div>
                                            <p style={{ margin: 0, color: '#374151', fontSize: '0.9rem' }}>{review.admin_reply}</p>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem',
                                        fontWeight: '600', textAlign: 'center',
                                        background: review.approved ? '#dcfce7' : '#fef3c7',
                                        color: review.approved ? '#059669' : '#d97706'
                                    }}>
                                        {review.approved ? '✅ Approved' : '⏳ Pending'}
                                    </span>

                                    {!review.approved ? (
                                        <button
                                            onClick={() => approve(review.id)}
                                            style={{
                                                padding: '0.5rem', borderRadius: '8px', border: 'none',
                                                background: '#059669', color: 'white', cursor: 'pointer', fontWeight: '500'
                                            }}>
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => reject(review.id)}
                                            style={{
                                                padding: '0.5rem', borderRadius: '8px', border: 'none',
                                                background: '#d97706', color: 'white', cursor: 'pointer', fontWeight: '500'
                                            }}>
                                            Unpublish
                                        </button>
                                    )}

                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        style={{
                                            padding: '0.5rem', borderRadius: '8px', border: 'none',
                                            background: '#dc2626', color: 'white', cursor: 'pointer', fontWeight: '500'
                                        }}>
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Write a reply..."
                                    value={replyText[review.id] || ''}
                                    onChange={e => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                                    style={{
                                        flex: 1, padding: '0.5rem 1rem',
                                        border: '1px solid #d1d5db', borderRadius: '8px',
                                        fontSize: '0.9rem', outline: 'none'
                                    }}
                                />
                                <button
                                    onClick={() => submitReply(review.id)}
                                    style={{
                                        padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                                        background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: '500'
                                    }}>
                                    Reply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReviews;