import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="nav-logo">
                            <img src="/Icon.png" alt="FriendlyStay Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
                            FriendlyStay
                        </Link>
                        <p>
                            Your trusted homestay in Chennai. We offer premium daily and weekly rental rooms, private rooms, and 2BHK
                            flats across multiple convenient locations.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/properties">Properties</Link></li>
                            <li><Link to="/reviews">Reviews</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Room Types</h4>
                        <ul>
                            <li><Link to="/properties">Single Rooms</Link></li>
                            <li><Link to="/properties">Private Rooms</Link></li>
                            <li><Link to="/properties">2BHK Flats</Link></li>
                            <li><Link to="/properties">Weekly Rentals</Link></li>
                            <li><Link to="/properties">Monthly Rentals</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Friendlystay Homestay. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/terms">Property Policies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;