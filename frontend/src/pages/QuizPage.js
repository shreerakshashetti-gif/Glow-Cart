import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const questions = [
  {
    id: 'skinType',
    step: 1,
    emoji: '🌿',
    question: 'What is your skin type?',
    subtitle: 'Understanding your skin\'s natural state is the first step to perfect care.',
    options: [
      { value: 'oily', label: 'Oily', desc: 'Shiny, enlarged pores, prone to breakouts' },
      { value: 'dry', label: 'Dry', desc: 'Tight, flaky, sometimes rough texture' },
      { value: 'combination', label: 'Combination', desc: 'Oily T-zone, dry cheeks' },
      { value: 'normal', label: 'Normal', desc: 'Balanced, minimal concerns' },
      { value: 'sensitive', label: 'Sensitive', desc: 'Easily irritated, reactive to products' },
    ]
  },
  {
    id: 'concern',
    step: 2,
    emoji: '✨',
    question: 'What is your primary skin concern?',
    subtitle: 'Tell us what bothers you most — we\'ll target it with precision.',
    options: [
      { value: 'acne', label: 'Acne & Breakouts', desc: 'Pimples, blackheads, blemishes' },
      { value: 'aging', label: 'Anti-Aging', desc: 'Fine lines, wrinkles, loss of firmness' },
      { value: 'brightening', label: 'Brightening', desc: 'Dull skin, dark spots, hyperpigmentation' },
      { value: 'hydration', label: 'Deep Hydration', desc: 'Dryness, dehydration, lack of glow' },
      { value: 'pores', label: 'Pores & Texture', desc: 'Enlarged pores, uneven texture' },
    ]
  },
  {
    id: 'sensitivity',
    step: 3,
    emoji: '🌸',
    question: 'Does your skin react easily to products?',
    subtitle: 'Sensitivity affects which ingredients will work best for you.',
    options: [
      { value: 'yes', label: 'Yes, Very Sensitive', desc: 'I often experience redness, irritation, or stinging' },
      { value: 'sometimes', label: 'Sometimes', desc: 'Mild reactions occasionally with strong products' },
      { value: 'no', label: 'No, Resilient', desc: 'My skin tolerates most products well' },
    ]
  },
  {
    id: 'age',
    step: 4,
    emoji: '⏳',
    question: 'What is your age group?',
    subtitle: 'Skin needs evolve — we tailor recommendations to your stage of life.',
    options: [
      { value: 'under25', label: 'Under 25', desc: 'Prevention and foundation care' },
      { value: '25-30', label: '25 – 30', desc: 'Early maintenance and protection' },
      { value: '30+', label: '30 – 40', desc: 'Active anti-aging care begins' },
      { value: '40+', label: '40 – 50', desc: 'Targeted repair and rejuvenation' },
      { value: '50+', label: '50+', desc: 'Intensive nourishment and renewal' },
    ]
  },
  {
    id: 'lifestyle',
    step: 5,
    emoji: '☀️',
    question: 'What best describes your lifestyle?',
    subtitle: 'Your environment shapes your skin — let\'s account for that.',
    options: [
      { value: 'outdoors', label: 'Outdoors & Active', desc: 'Frequent sun exposure, sports, nature' },
      { value: 'urban', label: 'Urban Professional', desc: 'City life, pollution, stress, late nights' },
      { value: 'active', label: 'Fitness Focused', desc: 'Frequent workouts, sweating, gym life' },
      { value: 'homebody', label: 'Mostly Indoors', desc: 'Work from home, low sun exposure' },
    ]
  }
];

const QuizPage = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const current = questions[step];
  const progress = ((step) / questions.length) * 100;

  const handleSelect = (value) => setSelected(value);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelected(answers[questions[step - 1].id] || null);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/quiz/submit`, { answers: finalAnswers });
      updateUser({ skinProfile: data.skinProfile, quizHistory: [{ answers: finalAnswers, recommendedProducts: data.recommendedProducts }] });
      navigate('/results', { state: { products: data.recommendedProducts, answers: finalAnswers } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          border: '2px solid rgba(17,17,17,0.15)',
          borderTopColor: '#111111',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#111111' }}>Analyzing Your Skin...</p>
        <p style={{ color: 'rgba(17,17,17,0.6)', fontSize: 13, letterSpacing: 1.5 }}>CURATING YOUR PERFECT ROUTINE</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px' }}>
      <div className="page-enter" style={{ width: '100%', maxWidth: 640 }}>

        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: 'rgba(17,17,17,0.65)', fontSize: 12, letterSpacing: 2 }}>
              STEP {step + 1} OF {questions.length}
            </span>
            <span style={{ color: '#111111', fontSize: 12, letterSpacing: 1 }}>{Math.round(progress)}% Complete</span>
          </div>
          <div style={{ height: 2, background: 'rgba(17,17,17,0.12)', borderRadius: 1 }}>
            <div style={{
              height: '100%', borderRadius: 1,
              background: '#111111',
              width: `${progress}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i < step ? '#111111' : i === step ? 'rgba(17,17,17,0.35)' : 'rgba(17,17,17,0.12)',
                transition: 'background 0.4s ease'
              }} />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card" style={{ padding: '48px 40px', background: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={{ fontSize: 44, display: 'block', marginBottom: 16, color: 'rgba(17,17,17,0.7)' }}>{current.emoji}</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 32, fontWeight: 700, color: '#111111', marginBottom: 10, lineHeight: 1.2
            }}>{current.question}</h2>
            <p style={{ color: 'rgba(17,17,17,0.72)', fontSize: 15, lineHeight: 1.6 }}>{current.subtitle}</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.18)', borderRadius: 10, padding: '12px 16px', color: '#881b22', fontSize: 14, marginBottom: 24, textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {current.options.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    background: isSelected
                      ? '#f5f5f3'
                      : '#ffffff',
                    border: isSelected ? '1px solid rgba(17,17,17,0.8)' : '1px solid rgba(17,17,17,0.12)',
                    borderRadius: 14, padding: '16px 20px',
                    cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 16,
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(17,17,17,0.25)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(17,17,17,0.12)'; }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    border: isSelected ? '6px solid #111111' : '2px solid rgba(17,17,17,0.3)',
                    transition: 'all 0.25s ease'
                  }} />
                  <div>
                    <div style={{ color: isSelected ? '#111111' : '#111111', fontSize: 15, fontWeight: 600, marginBottom: 2 }}>
                      {opt.label}
                    </div>
                    <div style={{ color: 'rgba(17,17,17,0.68)', fontSize: 13 }}>{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12 }}>
            {step > 0 && (
              <button className="btn-ghost" onClick={handleBack} style={{ flex: '0 0 auto', padding: '14px 28px' }}>
                ← Back
              </button>
            )}
            <button
              className="btn-gold"
              onClick={handleNext}
              disabled={!selected}
              style={{
                flex: 1, padding: '16px',
                opacity: selected ? 1 : 0.4,
                cursor: selected ? 'pointer' : 'not-allowed'
              }}
            >
              {step === questions.length - 1 ? 'Reveal My Results ✨' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
