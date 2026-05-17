import React, { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Hero() {
  const { lang, t } = useLang();
  const canvasRef = useRef(null);
  const primaryColor = '#dc2626';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.1,
    }));
    
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    
    const onResize = () => { 
      w = canvas.width = window.innerWidth; 
      h = canvas.height = window.innerHeight; 
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, width: '100%', height: '100%' }} />

      {/* Animated Gradient Orbs - متكيفة مع الشاشة */}
      <div style={{
        position: 'absolute',
        width: '80vw',
        height: '80vw',
        maxWidth: 600,
        maxHeight: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)',
        top: '10%',
        left: '-30%',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        maxWidth: 450,
        maxHeight: 450,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
        bottom: '5%',
        right: '-20%',
        animation: 'float 15s ease-in-out infinite reverse',
        zIndex: 0,
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
        direction: t.dir,
      }}>
        
        {/* Content Wrapper - على الموبايل عمودي، على الكمبيوتر أفقي */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
          width: '100%',
        }}>
          
          {/* Left Side - Text Content (يظهر أولاً على الموبايل) */}
          <div style={{
            textAlign: lang === 'ar' ? 'right' : 'center',
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(220,38,38,0.1)',
              border: `1px solid rgba(220,38,38,0.3)`,
              borderRadius: 40,
              padding: '6px 16px 6px 12px',
              marginBottom: 24,
              fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif',
            }}>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: primaryColor,
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: primaryColor,
                letterSpacing: 1,
              }}>✦ {t.hero.description}</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Montserrat, sans-serif',
              fontSize: 'clamp(36px, 8vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 16,
              color: '#ffffff',
            }}>
              {t.hero.title.split(' ').map((word, i) => (
                <span key={i}>
                  {word === 'Your' ? (
                    <span style={{ color: primaryColor }}>{word} </span>
                  ) : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif',
              fontSize: 'clamp(14px, 4vw, 18px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 28,
            }}>
              {t.hero.subtitle}
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 40,
            }}>
              <a href="#contact" style={{
                padding: '12px 28px',
                borderRadius: 40,
                background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                color: '#fff',
                fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: `0 4px 15px rgba(220,38,38,0.3)`,
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(220,38,38,0.4)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(220,38,38,0.3)'; 
                }}
              >
                {t.hero.cta}
                <span style={{ fontSize: 16 }}>→</span>
              </a>
              <a href="#about" style={{
                padding: '12px 28px',
                borderRadius: 40,
                background: 'transparent',
                border: `2px solid rgba(220,38,38,0.4)`,
                color: '#fff',
                fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { 
                  e.currentTarget.style.borderColor = primaryColor; 
                  e.currentTarget.style.background = 'rgba(220,38,38,0.1)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)'; 
                  e.currentTarget.style.background = 'transparent'; 
                }}
              >
                {t.hero.cta2}
              </a>
            </div>

            {/* Stats Strip */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(24px, 8vw, 48px)',
              flexWrap: 'wrap',
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: primaryColor }}>4+</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Years Experience</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: primaryColor }}>100+</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Happy Clients</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: primaryColor }}>NASM</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Certified</div>
              </div>
            </div>
          </div>

          {/* Right Side - Profile Image (يظهر تحت النص على الموبايل) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}>
            <div style={{
              position: 'relative',
              width: 'min(280px, 70vw)',
              maxWidth: 320,
            }}>
              {/* Decorative rings */}
              <div style={{
                position: 'absolute',
                top: -15,
                left: -15,
                right: -15,
                bottom: -15,
                borderRadius: '40% 60% 35% 65% / 60% 45% 55% 40%',
                background: `linear-gradient(135deg, ${primaryColor}, transparent)`,
                opacity: 0.15,
                animation: 'rotate 20s linear infinite',
                zIndex: 0,
              }} />
              <div style={{
                position: 'absolute',
                top: -8,
                left: -8,
                right: -8,
                bottom: -8,
                borderRadius: '55% 45% 60% 40% / 45% 55% 40% 60%',
                background: `linear-gradient(225deg, ${primaryColor}, transparent)`,
                opacity: 0.1,
                animation: 'rotateReverse 25s linear infinite',
                zIndex: 0,
              }} />
              
              {/* Image Container */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: 24,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(0,0,0,0.5))',
                border: `1px solid rgba(220,38,38,0.3)`,
              }}>
                <img
                  src="/coach.jpg"
                  alt="Mohamed Gad - Personal Trainer"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 50px 30px; text-align: center;">
                        <div style="font-size: 60px; margin-bottom: 12px;">🏋️</div>
                        <div style="font-family: 'Montserrat', sans-serif; font-size: 20px; color: #dc2626;">COACH MG</div>
                        <div style="font-family: 'Poppins', sans-serif; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 8px;">Add coach.jpg to /public folder</div>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Name Tag */}
              <div style={{
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#1a1a1a',
                border: `1px solid rgba(220,38,38,0.3)`,
                borderRadius: 40,
                padding: '8px 20px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(10px)',
                zIndex: 3,
              }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(12px, 3vw, 16px)', fontWeight: 700, color: '#fff' }}>MOHAMED GAD</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 8, color: primaryColor, letterSpacing: 1 }}>NASM Certified CPT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - أخفى على الموبايل الصغير */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
      }}
      onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
        <div style={{
          width: 1,
          height: 25,
          background: `linear-gradient(to bottom, ${primaryColor}, transparent)`,
          animation: 'bounce 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 15px) scale(0.95);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes rotateReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }
        
        /* منع أي سكرول أفقي */
        @media (max-width: 768px) {
          section {
            overflow-x: hidden !important;
          }
        }
      `}</style>
    </section>
  );
}