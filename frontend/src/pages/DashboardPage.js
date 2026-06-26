import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ label, value, icon }) => (
  <div className="glass-card" style={{ padding: '24px 28px', textAlign: 'center' }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 4
    }}>{value}</div>
    <div style={{ fontSize: 11, color: 'rgba(17,17,17,0.65)', letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const lastQuiz = user?.quizHistory?.[user.quizHistory.length - 1];
  const hasSkinProfile = user?.skinProfile?.skinType;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 96, paddingBottom: 60, padding: '96px 40px 60px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} className="page-enter">

        {/* Hero Greeting */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>
            ✦ Welcome Back
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 56, fontWeight: 700, lineHeight: 1.1,
            color: '#111111', marginBottom: 16
          }}>
            Hello, <span style={{
              color: '#111111',
              fontWeight: 800
            }}>{user?.name?.split(' ')[0]}</span>
          </h1>
          <p style={{ color: 'rgba(17,17,17,0.72)', fontSize: 16, maxWidth: 500, lineHeight: 1.7 }}>
            Your personalized skincare journey continues. Discover products crafted for your unique skin.
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          <StatCard label="Quizzes Taken" value={user?.quizHistory?.length || 0} icon="📋" />
          <StatCard label="Products Found" value={lastQuiz?.recommendedProducts?.length || 0} icon="✨" />
          <StatCard label="Skin Type" value={hasSkinProfile ? user.skinProfile.skinType : '—'} icon="🌿" />
        </div>

        {/* Main CTA + Profile Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>

          {/* Take Quiz CTA */}
          <div className="glass-card" style={{
            padding: 40, position: 'relative', overflow: 'hidden',
            background: '#ffffff'
          }}>
            <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
              {hasSkinProfile ? '✦ Retake Quiz' : '✦ Get Started'}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 16, lineHeight: 1.2
            }}>
              {hasSkinProfile ? 'Update Your Skin Profile' : 'Discover Your Skin Type'}
            </h2>
            <p style={{ color: 'rgba(17,17,17,0.72)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              Answer 5 personalized questions and receive curated product recommendations delivered to your inbox.
            </p>
            <Link to="/quiz">
              <button className="btn-gold">
                {hasSkinProfile ? 'Retake Quiz →' : 'Start Quiz →'}
              </button>
            </Link>
          </div>

          {/* Skin Profile */}
          <div className="glass-card" style={{ padding: 40, background: '#ffffff' }}>
            <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
              ✦ Your Skin Profile
            </p>
            {hasSkinProfile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Skin Type', value: user.skinProfile.skinType },
                  { label: 'Concern', value: user.skinProfile.concerns?.[0] },
                  { label: 'Sensitivity', value: user.skinProfile.sensitivity === 'yes' ? 'Sensitive' : 'Normal' },
                  { label: 'Age Group', value: user.skinProfile.age },
                  { label: 'Lifestyle', value: user.skinProfile.lifestyle },
                ].map(({ label, value }) => value && (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '1px solid rgba(17,17,17,0.08)', paddingBottom: 12 }}>
                    <span style={{ color: 'rgba(17,17,17,0.65)', fontSize: 13, letterSpacing: 0.5 }}>{label}</span>
                    <span style={{
                      color: '#111111', fontSize: 14, fontWeight: 600, textTransform: 'capitalize',
                      background: '#f5f5f3', padding: '4px 12px', borderRadius: 20,
                      border: '1px solid rgba(17,17,17,0.08)'
                    }}>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 16, color: 'rgba(17,17,17,0.2)' }}>🌸</div>
                <p style={{ color: 'rgba(17,17,17,0.58)', fontSize: 14, lineHeight: 1.6 }}>
                  Take the skin quiz to build your personalized profile
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Last Recommendations */}
        {lastQuiz && lastQuiz.recommendedProducts?.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>✦ Last Results</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#111111' }}>
                  Your Recommendations
                </h3>
              </div>
              <Link to="/results" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost" style={{ fontSize: 12, padding: '10px 24px' }}>View All</button>
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {lastQuiz.recommendedProducts.slice(0, 3).map((p, i) => (
                <div key={i} className="glass-card" style={{ padding: 24, transition: 'transform 0.3s ease', background: '#ffffff' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{p.brand}</p>
                  <h4 style={{ color: '#111111', fontSize: 16, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{p.name}</h4>
                  <p style={{ color: 'rgba(17,17,17,0.68)', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>{p.description.slice(0, 70)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#111111', fontWeight: 700, fontSize: 16 }}>{p.price}</span>
                    <a href={p.link} target="_blank" rel="noreferrer" style={{
                      color: '#111111', fontSize: 12, textDecoration: 'none',
                      border: '1px solid rgba(17,17,17,0.14)', borderRadius: 20, padding: '5px 14px',
                      transition: 'all 0.3s'
                    }}>Shop →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
