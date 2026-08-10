import { useState, useEffect } from 'react';
import heroImage from '../assets/hero.jpeg';

const Hero = () => {
    const [counts, setCounts] = useState({
        guests: 0,
        locations: 0,
        rating: 0,
        support: "24/7"
    });

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const targets = {
            guests: 3000,
            locations: 3,
            rating: 4.8
        };

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
                setCounts({
                    guests: targets.guests,
                    locations: targets.locations,
                    rating: targets.rating,
                    support: "24/7"
                });
                clearInterval(timer);
            } else {
                const progress = currentStep / steps;
                setCounts({
                    guests: Math.floor(targets.guests * progress),
                    locations: Math.floor(targets.locations * progress),
                    rating: Number((targets.rating * progress).toFixed(1)),
                    support: "24/7"
                });
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero-bg">
                <img
                    src={heroImage}
                    alt="Friendlystay Homestay Exterior"
                />
            </div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">
                        ✨ Chennai's Most Trusted Homestay
                    </div>
                    <h1 className="hero-title">
                        Your <span className="gradient-text">Home Away</span><br />From Home
                    </h1>
                    <p className="hero-description">
                        Experience comfort and convenience at Friendlystay Homestay. Fully furnished rooms, private apartments &
                        2BHK flats available for daily and weekly rental across multiple locations in Chennai.
                    </p>
                    <div className="hero-actions">
                        <a href="/properties" className="btn btn-primary btn-lg">
                            Explore Properties →
                        </a>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <h3>{counts.guests}+</h3>
                            <p>Happy Guests</p>
                        </div>
                        <div className="hero-stat">
                            <h3>{counts.locations}</h3>
                            <p>Locations in Chennai</p>
                        </div>
                        <div className="hero-stat">
                            <h3>{counts.rating}</h3>
                            <p>Average Rating</p>
                        </div>
                        <div className="hero-stat">
                            <h3>{counts.support}</h3>
                            <p>Support Available</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
