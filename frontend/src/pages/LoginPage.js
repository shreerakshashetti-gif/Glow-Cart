import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div className="page-enter" style={{ width: '100%', maxWidth: 460 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: '#111111', fontSize: 28, display: 'block', marginBottom: 12 }}>✦</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 40, fontWeight: 700, letterSpacing: 2,
              color: '#111111',
              lineHeight: 1.1, marginBottom: 8
            }}>LUMIÈRE</h1>
            <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase' }}>
              Skincare · Elevated
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '48px 40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28, fontWeight: 700, color: '#111111',
            marginBottom: 8, textAlign: 'center'
          }}>Welcome Back</h2>
          <p style={{ color: 'rgba(17,17,17,0.68)', fontSize: 14, textAlign: 'center', marginBottom: 36 }}>
            Sign in to your skincare sanctuary
          </p>

          {error && (
            <div style={{
              background: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              borderRadius: 10, padding: '12px 16px',
              color: '#ff8a95', fontSize: 14, marginBottom: 24,
              textAlign: 'center'
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label className="luxury-label">Email Address</label>
              <input
                className="luxury-input"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: 32 }}>
              <label className="luxury-label">Password</label>
              <input
                className="luxury-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{ width: '100%', padding: '16px', fontSize: 13 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="ornament" style={{ margin: '28px 0' }}>
            <span>or</span>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(17,17,17,0.65)', fontSize: 14 }}>
            New to Lumière?{' '}
            <Link to="/register" style={{
              color: '#111111', textDecoration: 'none', fontWeight: 600,
              borderBottom: '1px solid rgba(17,17,17,0.2)'
            }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
