const policies = [
    {
        number: '01',
        title: 'Payment Policy',
        icon: '💳',
        items: [
            'An advance payment of ₹1,000 per room is required to confirm the booking.',
            'The remaining balance must be paid in cash upon arrival.',
            'For online payment, a 5% service charge will be applicable on the agreed room rent.',
        ],
    },
    {
        number: '02',
        title: 'Security Deposit (Bulk Bookings)',
        icon: '🔒',
        items: [
            'A refundable security deposit may be collected for bulk bookings.',
            'The deposit will be refunded at checkout, provided no damage has been caused to the property, furnishings, or other contents.',
        ],
    },
    {
        number: '03',
        title: 'Cancellation Policy',
        icon: '📅',
        items: [
            'Free cancellation is available up to 48 hours before check-in.',
            'Cancellations made within 48 hours of check-in, or no-shows, will incur a cancellation charge of ₹1,500.',
        ],
    },
    {
        number: '04',
        title: 'Additional Guests & Bedding',
        icon: '🛏️',
        items: [
            'An additional charge of ₹600 per person applies for extra guests.',
            'The same charge applies for the provision of a floor mattress.',
        ],
    },
    {
        number: '05',
        title: 'Damage Policy',
        icon: '⚠️',
        items: [
            'Guests are responsible for any damage caused to the property or its contents.',
            'Appropriate penalties may be charged to cover repair, replacement, or maintenance costs, including but not limited to: property damage, excessively soiled vessels or furnishings, and smoking inside rooms or bathrooms.',
        ],
    },
    {
        number: '06',
        title: 'Quiet Hours',
        icon: '🌙',
        items: [
            'Quiet hours are observed from 10:00 PM to 6:00 AM.',
            'Guests are requested to minimise noise during this period to avoid disturbing others.',
        ],
    },
    {
        number: '07',
        title: 'Pet Policy',
        icon: '🐾',
        items: [
            'Pets are allowed only with prior approval from management.',
            'Additional charges may apply.',
        ],
    },
    {
        number: '08',
        title: 'Party & Event Policy',
        icon: '🎉',
        items: [
            'Parties, gatherings, or events are permitted only with prior approval from management.',
            'Additional charges may apply.',
        ],
    },
];

const Terms = () => {
    return (
        <main>
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-breadcrumb">
                        <a href="/">Home</a>
                        <span className="separator">›</span>
                        <span className="text-gold">Property Policies</span>
                    </div>
                    <h1>Property <span className="gradient-text">Policies</span></h1>
                    <p>Please read our policies carefully before making a booking. These ensure a comfortable and respectful stay for all our guests.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

                        {/* Info banner */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.04))',
                            border: '1px solid rgba(37,99,235,0.2)',
                            borderRadius: '14px',
                            padding: '1.25rem 1.5rem',
                            marginBottom: '2.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                        }}>
                            <span style={{ fontSize: '1.25rem', marginTop: '1px' }}>ℹ️</span>
                            <p style={{ color: 'var(--clr-text)', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                                By confirming your booking with Friendlystay, you agree to abide by the policies listed below.
                                For any questions, feel free to <a href="/contact" style={{ color: 'var(--clr-primary)', fontWeight: '500' }}>contact us</a>.
                            </p>
                        </div>

                        {/* Policy cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {policies.map((policy) => (
                                <div
                                    key={policy.number}
                                    style={{
                                        background: 'var(--clr-bg-card)',
                                        borderRadius: '14px',
                                        padding: '1.75rem',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                        border: '1px solid var(--clr-border-light)',
                                        display: 'flex',
                                        gap: '1.25rem',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    {/* Number badge */}
                                    <div style={{
                                        minWidth: '44px',
                                        height: '44px',
                                        borderRadius: '10px',
                                        background: 'rgba(37,99,235,0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        color: 'var(--clr-primary)',
                                        letterSpacing: '0.04em',
                                    }}>
                                        {policy.number}
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                                            <span style={{ fontSize: '1.1rem' }}>{policy.icon}</span>
                                            <h3 style={{
                                                margin: 0,
                                                fontSize: '1.05rem',
                                                fontWeight: '700',
                                                color: 'var(--clr-text-heading)',
                                            }}>
                                                {policy.title}
                                            </h3>
                                        </div>
                                        <ul style={{
                                            margin: 0,
                                            paddingLeft: '1.25rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                        }}>
                                            {policy.items.map((item, i) => (
                                                <li key={i} style={{
                                                    color: 'var(--clr-text-muted)',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.65',
                                                }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer note */}
                        <div style={{
                            marginTop: '2.5rem',
                            textAlign: 'center',
                            padding: '1.5rem',
                            borderTop: '1px solid var(--clr-border-light)',
                        }}>
                            <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Have questions about our policies? We're happy to help.
                            </p>
                            <a href="/contact" className="btn btn-primary btn-sm">Contact Us</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Terms;
