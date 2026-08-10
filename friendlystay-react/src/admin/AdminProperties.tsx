import { useState, useEffect } from 'react';

import { API_BASE_URL as API } from '../config/api';

interface Property {
    id: number;
    name: string;
    description: string;
    address: string;
    price_min: number;
    price_max: number;
    amenities: string[];
    whatsapp_link: string;
    document_url?: string;
    images?: string[];
}

const AdminProperties = ({ token }: { token: string }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [editing, setEditing] = useState<Property | null>(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    useEffect(() => {
        fetch(`${API}/admin/properties`, { headers })
            .then(r => r.json())
            .then(data => {
                if (data.success) setProperties(data.properties);
                else setMessage('No properties found. Add them via Neon SQL.');
            });
    }, []);

    const save = async () => {
        if (!editing || !editing.name.trim()) {
            setMessage('❌ Property name is required.');
            return;
        }

        const isNew = editing.id === 0;
        setSaving(true);
        try {
            const endpoint = isNew
                ? `${API}/admin/properties`
                : `${API}/admin/properties/${editing.id}`;
            const res = await fetch(endpoint, {
                method: isNew ? 'POST' : 'PUT',
                headers,
                body: JSON.stringify({
                    name: editing.name,
                    description: editing.description,
                    address: editing.address,
                    price_min: editing.price_min,
                    price_max: editing.price_max,
                    amenities: editing.amenities,
                    whatsapp_link: editing.whatsapp_link,
                    images: editing.images || [],
                })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Unable to save property');
            }

            const savedProperty = data.property || editing;
            setMessage(isNew ? '✅ Property added successfully!' : '✅ Property updated successfully!');
            setProperties(prev => isNew
                ? [...prev, savedProperty]
                : prev.map(p => p.id === editing.id ? savedProperty : p));
            setEditing(null);
        } catch (error) {
            setMessage(`❌ ${error instanceof Error ? error.message : 'Save failed. Please try again.'}`);
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editing) return;
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('document', file);
            const res = await fetch(`${API}/admin/properties/${editing.id}/document`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setEditing({ ...editing, document_url: data.document_url });
                setProperties(prev => prev.map(p => p.id === editing.id ? { ...p, document_url: data.document_url } : p));
                setMessage('✅ Document uploaded successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('❌ Upload failed: ' + data.message);
            }
        } catch (err) {
            setMessage('❌ Upload error. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#1e3a5f', margin: 0 }}>Properties Management</h2>
                <button
                    onClick={() => setEditing({ id: 0, name: '', description: '', address: '', price_min: 0, price_max: 0, amenities: [], whatsapp_link: '' })}
                    style={{
                        padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
                        background: '#16a34a', color: 'white', cursor: 'pointer',
                        fontWeight: '600', fontSize: '0.9rem'
                    }}>
                    + New Property
                </button>
            </div>

            {message && (
                <div style={{
                    padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem',
                    background: message.startsWith('❌') ? '#fee2e2' : '#dcfce7',
                    color: message.startsWith('❌') ? '#dc2626' : '#059669',
                    fontWeight: '500'
                }}>{message}</div>
            )}

            {properties.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: '#64748b' }}>No properties in database yet.</p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        Insert properties via Neon SQL Editor first.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {properties.map(property => (
                        <div key={property.id} style={{
                            background: 'white', borderRadius: '12px',
                            padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                            {editing?.id === property.id ? (
                                <div>
                                    <h3 style={{ color: '#1e3a5f', marginBottom: '1rem' }}>{editing.id === 0 ? 'Add New Property' : `Editing: ${editing.name}`}</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {[
                                            { label: 'Property Name', key: 'name', type: 'text' },
                                            { label: 'Address', key: 'address', type: 'text' },
                                            { label: 'Min Price (₹)', key: 'price_min', type: 'number' },
                                            { label: 'Max Price (₹)', key: 'price_max', type: 'number' },
                                            { label: 'WhatsApp Link', key: 'whatsapp_link', type: 'text' },
                                        ].map(field => (
                                            <div key={field.key}>
                                                <label style={{ display: 'block', marginBottom: '0.25rem', color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    value={(editing as any)[field.key] || ''}
                                                    onChange={e => setEditing({ ...editing, [field.key]: field.type === 'number' ? parseInt(e.target.value) : e.target.value })}
                                                    style={{
                                                        width: '100%', padding: '0.5rem 0.75rem',
                                                        border: '1px solid #d1d5db', borderRadius: '8px',
                                                        fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.25rem', color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>
                                            Amenities (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={(editing.amenities || []).join(', ')}
                                            onChange={e => setEditing({ ...editing, amenities: e.target.value.split(',').map(a => a.trim()) })}
                                            style={{
                                                width: '100%', padding: '0.5rem 0.75rem',
                                                border: '1px solid #d1d5db', borderRadius: '8px',
                                                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>

                                    {/* Document Upload Section */}
                                    <div style={{ marginTop: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>
                                            Property Document (PDF)
                                        </label>
                                        {editing.document_url && (
                                            <a
                                                href={editing.document_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ display: 'inline-block', marginBottom: '0.5rem', color: '#2563eb', fontSize: '0.85rem', textDecoration: 'none' }}
                                            >
                                                📄 View current document
                                            </a>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleDocumentUpload}
                                                disabled={uploading || editing.id === 0}
                                                style={{ fontSize: '0.85rem', color: '#374151' }}
                                            />
                                            {uploading && (
                                                <span style={{ color: '#2563eb', fontSize: '0.85rem' }}>Uploading...</span>
                                            )}
                                        </div>
                                        <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            Upload a PDF (brochure, price list, rules, etc.). It will appear as a link on the property card.
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                        <button onClick={save} disabled={saving} style={{
                                            padding: '0.625rem 1.5rem', borderRadius: '8px', border: 'none',
                                            background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: '600'
                                        }}>{saving ? 'Saving...' : editing.id === 0 ? 'Add Property' : 'Save Changes'}</button>
                                        <button onClick={() => setEditing(null)} style={{
                                            padding: '0.625rem 1.5rem', borderRadius: '8px', border: 'none',
                                            background: '#e2e8f0', color: '#374151', cursor: 'pointer', fontWeight: '600'
                                        }}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ color: '#1e3a5f', marginBottom: '0.25rem' }}>{property.name}</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{property.address}</p>
                                        <p style={{ color: '#2563eb', fontWeight: '600' }}>
                                            ₹{property.price_min?.toLocaleString()} – ₹{property.price_max?.toLocaleString()} / night
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                                            {(property.amenities || []).map((a, i) => (
                                                <span key={i} style={{
                                                    padding: '0.25rem 0.75rem', background: '#eff6ff',
                                                    color: '#2563eb', borderRadius: '20px', fontSize: '0.8rem'
                                                }}>{a}</span>
                                            ))}
                                        </div>
                                        {property.document_url && (
                                            <a
                                                href={property.document_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ display: 'inline-block', marginTop: '0.5rem', color: '#2563eb', fontSize: '0.85rem', textDecoration: 'none' }}
                                            >
                                                📄 View document
                                            </a>
                                        )}
                                    </div>
                                    <button onClick={() => setEditing(property)} style={{
                                        padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none',
                                        background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: '500'
                                    }}>Edit</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProperties;