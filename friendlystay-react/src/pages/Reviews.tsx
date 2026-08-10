import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

interface Review {
    id: number;
    name: string;
    initials: string;
    location: string;
    date: string;
    rating: number;
    text: string;
    adminReply: string | null;
}

interface DBReview {
    id: number;
    name: string;
    rating: number;
    review: string;
    admin_reply: string | null;
    created_at: string;
}

interface FormErrors {
    name?: string;
    email?: string;
}

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        property: '',
        rating: '5',
        review: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}/reviews`)
            .then(res => res.json())
            .then((data: DBReview[]) => {
                const formatted: Review[] = data.map(r => ({
                    id: r.id,
                    name: r.name,
                    initials: r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
                    location: 'Friendlystay',
                    date: new Date(r.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
                    rating: r.rating,
                    text: r.review,
                    adminReply: r.admin_reply || null
                }));
                setReviews(formatted);
            })
            .catch(err => console.error('Failed to fetch reviews:', err))
            .finally(() => setLoading(false));
    }, []);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (/\d/.test(formData.name)) {
            newErrors.name = 'Name should not contain numbers';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error on change
        if (errors[e.target.name as keyof FormErrors]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    rating: parseInt(formData.rating),
                    review: formData.review
                })
            });
            const data = await response.json();
            if (data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', property: '', rating: '5', review: '' });
                setErrors({});
            } else {
                alert('Failed to submit review. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} style={{ color: i < rating ? '#2563eb' : '#cbd5e1' }}>★</span>
        ));
    };

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : '0.0';

    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        label: `${star} ★`,
        count: reviews.filter(r => r.rating === star).length,
        percent: totalReviews > 0
            ? Math.round((reviews.filter(r => r.rating === star).length / totalReviews) * 100)
            : 0
    }));

    const filledStars = Math.round(parseFloat(avgRating));

    const errorStyle = {
        color: '#dc2626',
        fontSize: '0.8rem',
        marginTop: '0.25rem',
        display: 'block'
    };

    const inputErrorStyle = {
        border: '1px solid #dc2626'
    };

    return (
        <main>
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-breadcrumb">
                        <a href="/">Home</a>
                        <span className="separator">›</span>
                        <span className="text-gold">Reviews & Feedback</span>
                    </div>
                    <h1>Guest <span className="gradient-text">Reviews</span></h1>
                    <p>Hear from our happy guests. Your feedback helps us improve and serve you better.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center">
                        <span className="section-label">Overall Rating</span>
                        <h2 className="section-title">What Our Guests <span className="gradient-text">Say</span></h2>
                    </div>
                    <div className="rating-overview">
                        <div className="rating-big">
                            <div className="rating-big-number">{avgRating}</div>
                            <div className="rating-big-stars">{renderStars(filledStars)}</div>
                            <div className="rating-big-count">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</div>
                        </div>
                        <div className="rating-bars">
                            {ratingCounts.map((bar, i) => (
                                <div key={i} className="rating-bar-row">
                                    <span className="rating-bar-label">{bar.label}</span>
                                    <div className="rating-bar">
                                        <div className="rating-bar-fill" style={{ width: `${bar.percent}%` }}></div>
                                    </div>
                                    <span className="rating-bar-percent">{bar.percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--clr-bg-card)', paddingTop: 0 }}>
                <div className="container">
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)', padding: '2rem' }}>Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)', padding: '2rem' }}>No reviews yet. Be the first to review!</p>
                    ) : (
                        <div className="reviews-grid">
                            {reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-card-quote">"</div>
                                    <div className="review-card-stars">{renderStars(review.rating)}</div>
                                    <p className="review-card-text">{review.text}</p>
                                    {review.adminReply && (
                                        <div style={{
                                            background: '#eff6ff', borderRadius: '8px',
                                            padding: '0.75rem 1rem', marginTop: '0.75rem',
                                            borderLeft: '3px solid #2563eb'
                                        }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#2563eb', marginBottom: '0.25rem' }}>
                                                🏠 Response from FriendlyStay:
                                            </div>
                                            <p style={{ margin: 0, color: '#374151', fontSize: '0.9rem' }}>{review.adminReply}</p>
                                        </div>
                                    )}
                                    <div className="review-card-author">
                                        <div className="review-avatar">{review.initials}</div>
                                        <div>
                                            <div className="review-author-name">{review.name}</div>
                                            <div className="review-author-date">{review.location} • {review.date}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center">
                        <span className="section-label">Share Your Experience</span>
                        <h2 className="section-title">Write a <span className="gradient-text">Review</span></h2>
                    </div>

                    <div className="review-form-card" style={{ maxWidth: '800px', margin: '3rem auto' }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <h3 style={{ marginBottom: '0.5rem' }}>Thank you for your review!</h3>
                                <p style={{ color: 'var(--clr-text-muted)' }}>Your review has been submitted and will appear after approval.</p>
                                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
                                    Write Another Review
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className="form-group">
                                        <label>Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={errors.name ? inputErrorStyle : {}}
                                            required
                                        />
                                        {errors.name && <span style={errorStyle}>⚠ {errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="you@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={errors.email ? inputErrorStyle : {}}
                                        />
                                        {errors.email && <span style={errorStyle}>⚠ {errors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className="form-group">
                                        <label>Property Stayed At</label>
                                        <select name="property" className="form-control" value={formData.property} onChange={handleChange}>
                                            <option value="">Select a property</option>
                                            <option value="Kolapakkam">Friendlystay – Kolapakkam</option>
                                            <option value="Elite">Friendlystay Elite – Mugalivakkam</option>
                                            <option value="Prime">Friendlystay Prime – Valasaravakkam</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Rating *</label>
                                        <select name="rating" className="form-control" value={formData.rating} onChange={handleChange} required>
                                            <option value="5">★★★★★ Excellent</option>
                                            <option value="4">★★★★☆ Good</option>
                                            <option value="3">★★★☆☆ Average</option>
                                            <option value="2">★★☆☆☆ Poor</option>
                                            <option value="1">★☆☆☆☆ Terrible</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label>Your Review *</label>
                                    <textarea
                                        name="review"
                                        className="form-control"
                                        rows={5}
                                        placeholder="Tell us about your stay..."
                                        value={formData.review}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Review →'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Reviews;