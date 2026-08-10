import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface FormErrors {
    name?: string;
    phone?: string;
    email?: string;
}

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (/\d/.test(formData.name)) {
            newErrors.name = 'Name should not contain numbers';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Phone must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name as keyof FormErrors]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/enquiry`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', phone: '', email: '', message: '' });
                setErrors({});
            } else {
                alert('Failed to submit enquiry. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit enquiry. Please try again.');
        }
    };

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
                        <span className="text-gold">Contact Us</span>
                    </div>
                    <h1>Get In <span className="gradient-text">Touch</span></h1>
                    <p>We'd love to hear from you. Reach out through any channel – WhatsApp, phone, email, or the contact form below.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">

                        {/* Contact Info */}
                        <div>
                            <span className="section-label">Contact Info</span>
                            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>
                                Reach Us <span className="gradient-text">Anytime</span>
                            </h2>
                            <div className="contact-info-cards" style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                                {[
                                    { icon: <Phone size={24} />, title: 'Phone/Whatsapp', content: '+91 9840920824' },
                                    { icon: <Mail size={24} />, title: 'Email', content: 'friendlystay1@gmail.com' },
                                ].map((item, i) => (
                                    <div key={i} className="contact-info-card" style={{
                                        display: 'flex', gap: '1rem', padding: '1.5rem',
                                        background: 'var(--clr-bg-card)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--clr-border)'
                                    }}>
                                        <div className="contact-icon" style={{ color: 'var(--clr-primary)' }}>{item.icon}</div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                                            <p style={{ color: 'var(--clr-text-muted)' }}>{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-card" style={{
                            background: 'var(--clr-bg-card)', padding: '2.5rem',
                            borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)'
                        }}>
                            <h3>Send Us a <span className="gradient-text">Message</span></h3>

                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                                    <p style={{ color: 'var(--clr-text-muted)' }}>Thank you! We'll get back to you within 30 minutes.</p>
                                    <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                style={errors.name ? inputErrorStyle : {}}
                                                required
                                            />
                                            {errors.name && <span style={errorStyle}>⚠ {errors.name}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control"
                                                placeholder="10-digit number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                style={errors.phone ? inputErrorStyle : {}}
                                                maxLength={10}
                                                required
                                            />
                                            {errors.phone && <span style={errorStyle}>⚠ {errors.phone}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={errors.email ? inputErrorStyle : {}}
                                            required
                                        />
                                        {errors.email && <span style={errorStyle}>⚠ {errors.email}</span>}
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label>Message *</label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            rows={5}
                                            placeholder="How can we help?"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;