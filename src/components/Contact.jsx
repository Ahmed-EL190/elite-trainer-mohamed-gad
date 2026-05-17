import React, { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext.jsx";

function useVisible() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Contact() {
  const { lang, t } = useLang();
  const [ref, visible] = useVisible();
  const ff = lang === "ar" ? "Cairo, sans-serif" : "Poppins, sans-serif";
  const textColor = "#ffffff";
  const primaryColor = "#dc2626";

  const cards = [
    {
      icon: "📧",
      label: t.contact.email,
      value: "mgad71943@gmail.com",
      href: "mailto:mgad71943@gmail.com",
    },
    {
      icon: "📱",
      label: t.contact.phone,
      value: "+966 567 807 532",
      href: "tel:+966567807532",
    },
    {
      icon: "📍",
      label: t.contact.location,
      value: t.contact.locationVal,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "80px 24px 60px",
        background: "#0a0a0a",
        direction: t.dir,
      }}
    >
      <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Section Header - نفس تصميم باقي السكشنات */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(30px)",
            transition: "all 0.7s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(220,38,38,0.1)",
              border: `1px solid rgba(220,38,38,0.3)`,
              borderRadius: 40,
              padding: "6px 16px 6px 12px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: primaryColor,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: primaryColor,
                letterSpacing: 1,
              }}
            >
              ✦ {t.contact.subtitle}
            </span>
          </div>
          <h2
            style={{
              fontFamily:
                lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif",
              fontSize: "clamp(36px, 6vw, 56px)",
              margin: 0,
              color: textColor,
              letterSpacing: lang === "ar" ? 0 : 2,
              fontWeight: 700,
            }}
          >
            {t.contact.title}
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
              margin: "20px auto 0",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Contact Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(220,38,38,0.12)`,
                borderRadius: 20,
                padding: "32px 24px",
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(30px)",
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.4)`;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(220,38,38,0.12)`;
                e.currentTarget.style.background = "rgba(220,38,38,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = `rgba(220,38,38,0.12)`;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: `rgba(220,38,38,0.1)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  border: `1px solid rgba(220,38,38,0.2)`,
                }}
              >
                <div style={{ fontSize: 32 }}>{c.icon}</div>
              </div>
              <div
                style={{
                  fontFamily: ff,
                  fontSize: 12,
                  color: primaryColor,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                {c.label}
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  style={{
                    fontFamily: ff,
                    fontSize: 14,
                    color: textColor,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = textColor;
                  }}
                >
                  {c.value}
                </a>
              ) : (
                <div
                  style={{
                    fontFamily: ff,
                    fontSize: 14,
                    color: textColor,
                    fontWeight: 600,
                  }}
                >
                  {c.value}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(30px)",
            transition: "all 0.6s ease-out 0.3s",
          }}
        >
          <a
            href="https://wa.me/966567807532"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 44px",
              borderRadius: 50,
              background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
              color: "#fff",
              fontFamily: ff,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: `0 4px 20px rgba(220,38,38,0.3)`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(220,38,38,0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(220,38,38,0.3)`;
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.contact.whatsapp}
            <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </section>
  );
}