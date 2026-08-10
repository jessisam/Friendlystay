import Hero from '../components/Hero';
import aboutImage from '../assets/home1.jpg';

const Home = () => {
    return (
        <main>
            <Hero />

            {/* About Section */}
            <section className="section" id="about" style={{ background: 'var(--clr-bg-card)' }}>
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image">
                            <img
                                src={aboutImage}
                                alt="About Friendlystay Homestay"
                            />
                            <div className="about-image-overlay">
                                <h4>5+ Years of Hosting</h4>
                                <p>Trusted by hundreds of happy guests across Chennai</p>
                            </div>
                        </div>
                        <div>
                            <span className="section-label">About Us</span>
                            <h2 className="section-title">Why Choose <span className="gradient-text">Friendlystay?</span></h2>
                            <p className="section-subtitle" style={{ marginBottom: '1.5rem' }}>
                                Friendlystay Homestay is a trusted name in Chennai for daily and weekly room rentals. With multiple branches
                                located within 1-2 km of each other, we offer flexible accommodation options — from single rooms and private
                                rooms to fully furnished 2BHK flats.
                            </p>
                            <div className="about-features">
                                {[
                                    { icon: '🛏️', title: 'Comfortable Beds', desc: 'Premium bedding' },
                                    { icon: '❄️', title: 'Air Conditioned', desc: 'Cool rooms always' },
                                    { icon: '📶', title: 'High-Speed WiFi', desc: 'Stay connected' },
                                    { icon: '🔒', title: 'Safe & Secure', desc: '24/7 security' },
                                    { icon: '🐾', title: 'Pet Friendly', desc: 'Furry friends welcome' },
                                    { icon: '🚗', title: 'Parking Space', desc: 'Secure spot' }
                                ].map((f, i) => (
                                    <div key={i} className="about-feature">
                                        <div className="about-feature-icon">{f.icon}</div>
                                        <div>
                                            <h4>{f.title}</h4>
                                            <p>{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations Section */}
            <section className="section" id="locations">
                <div className="container">
                    <div className="text-center">
                        <span className="section-label">Locations</span>
                        <h2 className="section-title">Find Us in <span className="gradient-text">Chennai</span></h2>
                        <p className="section-subtitle">
                            Our branches are conveniently located within 1-2 km of each other for easy access.
                        </p>
                    </div>

                    <div className="maps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                        {[
                            {
                                title: 'FriendlyStay Homestay - Kolapakkam',
                                addr: '5/161, Thamizh Nagar 3rd St, Kolapakkam, Chennai 600128',
                                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3148793629043!2d80.14448647358988!3d13.015609213914878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52617d05b5731d%3A0x7850821c9630adae!2sFriendlyStay%20Homestay!5e0!3m2!1sen!2sin!4v1771651212666!5m2!1sen!2sin"
                            },
                            {
                                title: 'Friendlystay Elite - Mugalivakkam',
                                addr: 'Plot No 20, 10th Cross, 1st St, Mugalivakkam, Chennai 600125',
                                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2738813792425!2d80.14583177358986!3d13.01822311385737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261b07bd4b30d%3A0x790179ec8a0525e8!2sFriendlystay%20-%20Elite!5e0!3m2!1sen!2sin!4v1771651423737!5m2!1sen!2sin"
                            },
                            {
                                title: 'FriendlyStay Prime - Valasaravakkam',
                                addr: '48, near Hotel Saravana bhavan, Sai Nagar, Porur, Chennai 600116',
                                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.988814639765!2d80.16534297359027!3d13.036383813457643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526165559b2cbb%3A0x82449a4ac1da796b!2sFriendlystay%20Prime!5e0!3m2!1sen!2sin!4v1771651505333!5m2!1sen!2sin"
                            }
                        ].map((map, i) => (
                            <div key={i} className="map-card" style={{ background: 'var(--clr-bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--clr-border)', boxShadow: 'var(--shadow-md)' }}>
                                <iframe
                                    src={map.src}
                                    style={{ width: '100%', height: '250px', border: 0 }}
                                    loading="lazy"
                                    title={map.title}
                                ></iframe>
                                <div className="map-card-info" style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>📍 {map.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>{map.addr}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 70%)' }}>
                <div className="container text-center">
                    <div>
                        <span className="section-label">Ready to Book?</span>
                        <h2 className="section-title">Find Your Perfect <span className="gradient-text">Stay</span></h2>
                        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                            Get in touch with us today and book your comfortable stay in Chennai. We're just a WhatsApp message away!
                        </p>
                        <div className="hero-actions" style={{ justifyContent: 'center' }}>
                            <a href="/contact" className="btn btn-primary btn-lg">Contact Us →</a>
                            <a href="https://wa.me/919840920824" target="_blank" className="btn btn-whatsapp btn-lg">
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
