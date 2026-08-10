import { useState } from 'react';

import { API_BASE_URL as API } from '../config/api';

const AdminLogin = ({ onLogin }: { onLogin: (token: string) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('admin_token', data.token);
                onLogin(data.token);
            } else {
                setError('Invalid username or password');
            }
        } catch {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '3rem',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px', height: '60px',
                        background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: '1.5rem', color: 'white', fontWeight: 'bold'
                    }}>FS</div>
                    <h2 style={{ color: '#1e3a5f', marginBottom: '0.5rem' }}>Admin Panel</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>FriendlyStay Management</p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2', color: '#dc2626',
                        padding: '0.75rem 1rem', borderRadius: '8px',
                        marginBottom: '1rem', fontSize: '0.9rem'
                    }}>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '0.75rem 1rem',
                                border: '1px solid #d1d5db', borderRadius: '8px',
                                fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
                            }}
                            placeholder="admin"
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '0.75rem 1rem',
                                border: '1px solid #d1d5db', borderRadius: '8px',
                                fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
                            }}
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '0.875rem',
                            background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
                            color: 'white', border: 'none', borderRadius: '8px',
                            fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;