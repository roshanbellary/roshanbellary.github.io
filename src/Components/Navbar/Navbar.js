import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo} onClick={closeMenu}>
        RB
      </NavLink>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={`${styles.link} ${location.pathname === path ? styles.linkActive : ''}`}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
