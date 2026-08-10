import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="container">
                    <Link to="/" className="nav-logo" onClick={closeMenu}>
                        <img src="/Icon.png" alt="FriendlyStay Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
                        FriendlyStay
                    </Link>

                    <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/properties" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
                                Properties
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
                                Reviews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <Link to="/contact" className="nav-cta" onClick={closeMenu}>
                                Book Now
                            </Link>
                        </li>
                    </ul>

                    <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                        {isOpen ? <X size={24} /> : (
                            <>
                                <span></span><span></span><span></span>
                            </>
                        )}
                    </button>
                </div>
            </nav>
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>
        </>
    );
};

export default Navbar;
