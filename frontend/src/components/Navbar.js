import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 40px',
      height: '72px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid rgba(17,17,17,0.08)' : '1px solid transparent',
      transition: 'all 0.4s ease'
    }}>
      {/* Logo */}
      <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: '#111111', fontSize: 20 }}>✦</span>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 20, fontWeight: 600, letterSpacing: 2,
          color: '#111111'
        }}>LUMIÈRE</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {[
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/quiz', label: 'Skin Quiz' },
        ].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            textDecoration: 'none',
            color: location.pathname === to ? '#111111' : 'rgba(17,17,17,0.65)',
            fontSize: 13, fontWeight: 600, letterSpacing: 1.5,
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
            position: 'relative',
            paddingBottom: 4
          }}>
            {label}
            {location.pathname === to && (
              <span style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 2,
                background: '#111111'
              }} />
            )}
          </Link>
        ))}
      </div>

      {/* User Info + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}>{user?.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(17,17,17,0.5)', letterSpacing: 0.5 }}>{user?.email}</div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid rgba(17,17,17,0.18)',
            borderRadius: 24,
            padding: '7px 18px',
            color: '#111111',
            fontSize: 12, letterSpacing: 1.5,
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => {
            e.target.style.borderColor = 'rgba(17,17,17,0.35)';
            e.target.style.color = '#111111';
          }}
          onMouseLeave={e => {
            e.target.style.borderColor = 'rgba(17,17,17,0.18)';
            e.target.style.color = '#111111';
          }}
        >Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
