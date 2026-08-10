import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

import { API_BASE_URL as API } from '../config/api';

interface DBProperty {
    id: number;
    name: string;
    address: string;
    price_min: number;
    price_max: number;
    amenities: string[];
    whatsapp_link: string;
    document_url?: string;
}

interface PropertyStatic {
    dbId: number;
    images: string[];
    types: string[];
    document: string;
}

// Static data that won't change (images + room types)
const staticData: PropertyStatic[] = [
    {
        dbId: 1,
        images: [
            'assets/kolapakkam/K_room1.JPG',
            'assets/kolapakkam/K_room2.JPG',
            'assets/kolapakkam/K_room3.JPG',
            'assets/kolapakkam/K_room4.JPG',
            'assets/kolapakkam/K_kitchen.JPG'
        ],
        types: ['Standard Room', 'Deluxe Room', 'Executive Room'],
        document: '/documents/Brochure - Friendlystay Kolapakkam.pdf'
    },
    {
        dbId: 2,
        images: [
            'assets/Elite/E_hall1.JPG',
            'assets/Elite/E_hall2.JPG',
            'assets/Elite/E_dinning.JPG',
            'assets/Elite/E_room1.JPG',
            'assets/Elite/E_room2.JPG',
            'assets/Elite/E_room3.JPG',
            'assets/Elite/E_room4.JPG',
            'assets/Elite/E_outkitch.JPG',
            'assets/Elite/E_balcony.JPG'
        ],
        types: ['Standard Room', 'Deluxe Room'],
        document: '/documents/Brochure - Friendlystay-Elite.pdf'
    },
    {
        dbId: 3,
        images: [
            'assets/prime/P_ext.JPG',
            'assets/prime/P_hall.JPG',
            'assets/prime/P_kitchen.JPG',
            'assets/prime/P_bedroom.JPG',
            'assets/prime/P_bedroom1.JPG',
            'assets/prime/P_lift.JPG'
        ],
        types: ['Deluxe Room'],
        document: '/documents/Brochure - Friendlystay Prime.pdf'
    }
];

const PropertyCarousel = ({ images, name }: { images: string[], name: string }) => {
    const [index, setIndex] = useState(0);
    const next = () => setIndex((index + 1) % images.length);
    const prev = () => setIndex((index - 1 + images.length) % images.length);

    return (
        <div className="property-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)`, display: 'flex', transition: 'transform 0.5s ease' }}>
                {images.map((img, i) => (
                    <img key={i} src={img} alt={`${name} - Image ${i + 1}`} style={{ width: '100%', flexShrink: 0, objectFit: 'cover' }} />
                ))}
            </div>
            <button className="carousel-btn prev" onClick={prev}><ChevronLeft /></button>
            <button className="carousel-btn next" onClick={next}><ChevronRight /></button>
            <div className="carousel-dots">
                {images.map((_, i) => (
                    <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                ))}
            </div>
        </div>
    );
};

const Properties = () => {
    const [dbProperties, setDbProperties] = useState<DBProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}/properties`)
            .then(r => r.json())
            .then(data => { if (data.success) setDbProperties(data.properties); })
            .catch(err => console.error('Failed to fetch properties:', err))
            .finally(() => setLoading(false));
    }, []);

    // Merge DB data with static data
    const mergedProperties = staticData.map(s => {
        const db = dbProperties.find(d => d.id === s.dbId);
        return { ...s, db };
    });

    return (
        <main>
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-breadcrumb">
                        <a href="/">Home</a>
                        <span className="separator">›</span>
                        <span className="text-gold">Properties</span>
                    </div>
                    <h1>Our <span className="gradient-text">Properties</span></h1>
                    <p>Explore our rooms and flats across Chennai. Each property is carefully maintained with modern amenities for your comfort.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)', padding: '2rem' }}>Loading properties...</p>
                    ) : (
                        <div className="enquiry-grid">
                            {mergedProperties.map(property => (
                                <div key={property.dbId} className="enquiry-card">
                                    <PropertyCarousel images={property.images} name={property.db?.name || ''} />
                                    <div className="enquiry-card-body">
                                        <h3>{property.db?.name || ''}</h3>
                                        <div className="enquiry-card-types">
                                            {property.types.map(t => <span key={t} className="enquiry-card-type">{t}</span>)}
                                        </div>
                                        <div className="enquiry-amenities-list">
                                            {(property.db?.amenities || []).map(a => (
                                                <div key={a} className="enquiry-amenity">
                                                    <CheckCircle2 size={14} className="check" style={{ color: 'var(--clr-primary)', marginRight: '5px' }} /> {a}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="enquiry-address">📍 {property.db?.address || ''}</div>
                                        <div className="property-card-footer" style={{ borderTop: 'none', paddingTop: 0, marginTop: 'auto' }}>
                                            <div className="property-price">
                                                ₹{property.db?.price_min?.toLocaleString()} - ₹{property.db?.price_max?.toLocaleString()} <span>/ night</span>
                                            </div>
                                        </div>
                                        <div className="enquiry-card-actions" style={{ marginTop: '1rem' }}>
                                            <a href={property.db?.whatsapp_link || '#'} target="_blank" className="btn btn-whatsapp btn-sm">
                                                WhatsApp Enquiry
                                            </a>
                                            <a href="/contact" className="btn btn-outline btn-sm">
                                                Send Email
                                            </a>
                                             <a
                                                   href={property.document}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline btn-sm"
                                                >
                                                    📄 View Property Document
                                             </a>
                                         </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Properties;