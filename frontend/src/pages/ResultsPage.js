import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px 28px',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        boxShadow: hovered ? '0 24px 60px rgba(17,17,17,0.08)' : 'none',
        animation: `fadeInUp 0.5s ease forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        background: '#ffffff'
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Rank Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{
          background: '#f1f1ef',
          color: '#111111', width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 15, flexShrink: 0
        }}>{index + 1}</div>
        <span style={{
          background: '#f5f5f3', border: '1px solid rgba(17,17,17,0.08)',
          borderRadius: 20, padding: '4px 14px', fontSize: 11,
          color: '#111111', letterSpacing: 1, textTransform: 'uppercase'
        }}>{product.category}</span>
      </div>

      {/* Product Info */}
      <p style={{ color: 'rgba(17,17,17,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
        {product.brand}
      </p>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 22, fontWeight: 700, color: '#111111', marginBottom: 12, lineHeight: 1.3
      }}>{product.name}</h3>
      <p style={{ color: 'rgba(17,17,17,0.72)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
        {product.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
        {product.tags?.map(tag => (
          <span key={tag} style={{
            background: '#f5f5f3', border: '1px solid rgba(17,17,17,0.08)',
            borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#111111',
            textTransform: 'capitalize', letterSpacing: 0.5
          }}>{tag}</span>
        ))}
      </div>

      {/* Price + CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 26, fontWeight: 700, color: '#111111'
        }}>{product.price}</span>
        <a
          href={product.link}
          target="_blank"
          rel="noreferrer"
          style={{
            background: '#111111',
            color: '#ffffff', textDecoration: 'none',
            padding: '10px 22px', borderRadius: 24,
            fontSize: 13, fontWeight: 700, letterSpacing: 1,
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 24px rgba(17,17,17,0.16)'; }}
          onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
        >
          Shop Now →
        </a>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [emailSent, setEmailSent] = useState(false);

  const products = location.state?.products;
  const answers = location.state?.answers;

  useEffect(() => {
    if (!products) {
      navigate('/dashboard');
      return;
    }
    // Show email banner after a short delay
    const t = setTimeout(() => setEmailSent(true), 1000);
    return () => clearTimeout(t);
  }, [products, navigate]);

  if (!products) return null;

  const skinLabels = {
    skinType: { oily: 'Oily', dry: 'Dry', combination: 'Combination', normal: 'Normal', sensitive: 'Sensitive' },
    concern: { acne: 'Acne & Breakouts', aging: 'Anti-Aging', brightening: 'Brightening', hydration: 'Deep Hydration', pores: 'Pores & Texture' },
    sensitivity: { yes: 'Very Sensitive', sometimes: 'Sometimes Sensitive', no: 'Resilient' },
    lifestyle: { outdoors: 'Outdoors & Active', urban: 'Urban Professional', active: 'Fitness Focused', homebody: 'Mostly Indoors' }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 96, paddingBottom: 80, padding: '96px 40px 80px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }} className="page-enter">

        {/* Email Banner */}
        {emailSent && (
          <div style={{
            background: '#f5f5f3',
            border: '1px solid rgba(17,17,17,0.08)', borderRadius: 16,
            padding: '16px 24px', marginBottom: 40,
            display: 'flex', alignItems: 'center', gap: 14,
            animation: 'slideDown 0.5s ease'
          }}>
            <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <span style={{ fontSize: 22, color: '#111111' }}>📧</span>
            <div>
              <p style={{ color: '#111111', fontSize: 14, fontWeight: 600 }}>
                Your personalized report has been sent to <span style={{ color: '#111111' }}>{user?.email}</span>
              </p>
              <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 12 }}>
                Check your inbox for all 5 product recommendations with direct shopping links.
              </p>
            </div>
          </div>
        )}

        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: 'rgba(17,17,17,0.65)', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>
            ✦ Your Results Are Ready
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 52, fontWeight: 700, color: '#111111', marginBottom: 16, lineHeight: 1.15
          }}>
            Your <span style={{ color: '#111111', fontWeight: 800 }}>Curated</span> Routine
          </h1>
          <p style={{ color: 'rgba(17,17,17,0.72)', fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Based on your unique skin profile, we've handpicked these 5 products to transform your skincare routine.
          </p>
        </div>

        {/* Skin Profile Summary */}
        <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 48, background: '#ffffff' }}>
          <p style={{ color: 'rgba(17,17,17,0.65)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>✦ Your Skin Profile Summary</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {answers && Object.entries(answers).map(([key, val]) => {
              const label = skinLabels[key]?.[val] || val;
              const keys = { skinType: 'Skin Type', concern: 'Main Concern', sensitivity: 'Sensitivity', age: 'Age Group', lifestyle: 'Lifestyle' };
              return (
                <div key={key} style={{ flex: '1 1 140px' }}>
                  <p style={{ color: 'rgba(17,17,17,0.55)', fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>{keys[key]}</p>
                  <p style={{ color: '#111111', fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 48 }}>
          {products.map((product, i) => (
            i < 4 ? <ProductCard key={i} product={product} index={i} /> : null
          ))}
        </div>
        {/* 5th product full width */}
        {products[4] && (
          <div style={{ marginBottom: 48 }}>
            <ProductCard product={products[4]} index={4} />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/quiz">
            <button className="btn-ghost" style={{ padding: '14px 32px' }}>Retake Quiz</button>
          </Link>
          <Link to="/dashboard">
            <button className="btn-gold" style={{ padding: '14px 32px' }}>Back to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
