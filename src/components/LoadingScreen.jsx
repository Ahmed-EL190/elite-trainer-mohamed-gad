import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const primaryColor = '#dc2626';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0a0a0a',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Gym Logo - أيقونة الجيم */}
      <div style={{
        width: 100,
        height: 100,
        borderRadius: 24,
        background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        boxShadow: `0 0 40px rgba(220,38,38,0.4)`,
        animation: 'pulse 1.5s ease-in-out infinite',
        position: 'relative',
      }}>
        {/* أيقونة الدمبل/الجيم */}
        <span style={{ fontSize: 48 }}>💪</span>
        
        {/* نجمة التميز */}
        <span style={{
          position: 'absolute',
          bottom: -8,
          right: -8,
          fontSize: 22,
          background: '#0a0a0a',
          borderRadius: '50%',
          padding: 4,
        }}>⭐</span>
      </div>

      {/* نص COACH MG */}
      <h1 style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 'clamp(28px, 6vw, 42px)',
        fontWeight: 800,
        background: `linear-gradient(135deg, #ffffff, ${primaryColor})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 8,
        letterSpacing: 4,
      }}>
       Mohamed Gad
      </h1>
      
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 14,
        color: primaryColor,
        letterSpacing: 4,
        marginBottom: 40,
        textTransform: 'uppercase',
        fontWeight: 600,
      }}>
        Personal Trainer
      </p>

      {/* شعار/وصف قصير */}
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
        marginBottom: 32,
        textAlign: 'center',
        maxWidth: '80%',
      }}>
        TRANSFORM YOUR BODY • TRANSFORM YOUR LIFE
      </p>

      {/* Progress Bar */}
      <div style={{
        width: 280,
        height: 3,
        background: '#2a2a2a',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${primaryColor}, #991b1b)`,
          transition: 'width 0.1s linear',
          borderRadius: 10,
        }} />
      </div>
      
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        marginTop: 16,
        letterSpacing: 1,
      }}>
        {progress}%
      </p>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 40px rgba(220,38,38,0.4);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 60px rgba(220,38,38,0.7);
            }
          }
        `}
      </style>
    </div>
  );
}