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
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Contact() {
  const { lang, t } = useLang();
  const [ref, visible] = useVisible();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const ff = lang === "ar" ? "Cairo, sans-serif" : "Poppins, sans-serif";
  const textColor = "#ffffff";
  const primaryColor = "#dc2626";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/mgad71943@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        e.target.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "60px 16px",
        background: "#0a0a0a",
        direction: t.dir,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "300px",
          background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 50,
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
              padding: "4px 12px 4px 10px",
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
                fontSize: 11,
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
              fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif",
              fontSize: "clamp(32px, 8vw, 56px)",
              margin: 0,
              color: textColor,
              letterSpacing: lang === "ar" ? 0 : 1,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${textColor}, ${primaryColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
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

        {/* Main Contact Container - 2 Columns responsive */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
            alignItems: "start",
          }}
        >
          {/* Left Side - Contact Info Cards */}
          <div>
            {/* WhatsApp Card - Highlighted */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.05))",
                border: `1.5px solid ${primaryColor}`,
                borderRadius: 20,
                padding: "24px 20px",
                marginBottom: 20,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(-30px)",
                transition: "all 0.6s ease-out 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
                  borderRadius: "50%",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  💬
                </div>
                <div>
                  <div style={{ fontFamily: ff, fontSize: 12, color: primaryColor, fontWeight: 600, letterSpacing: 1 }}>
                    {t.contact.whatsapp}
                  </div>
                  <div style={{ fontFamily: ff, fontSize: 18, fontWeight: 700, color: textColor }}>
                    WhatsApp
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/966567807532"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#25D366",
                  padding: "12px 24px",
                  borderRadius: 40,
                  color: "#fff",
                  fontFamily: ff,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  marginTop: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(37,211,102,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat Now →
              </a>
            </div>

            {/* Contact Info Cards - responsive */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(-30px)",
                transition: "all 0.6s ease-out 0.3s",
              }}
            >
              {[
                { icon: "📧", label: t.contact.email, value: "mgad71943@gmail.com", href: "mailto:mgad71943@gmail.com" },
                { icon: "📱", label: t.contact.phone, value: "+966 567 807 532", href: "tel:+966567807532" },
                { icon: "📍", label: t.contact.location, value: t.contact.locationVal, href: null },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(220,38,38,0.15)`,
                    borderRadius: 16,
                    padding: "14px 18px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220,38,38,0.08)";
                    e.currentTarget.style.borderColor = `rgba(220,38,38,0.4)`;
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = `rgba(220,38,38,0.15)`;
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `rgba(220,38,38,0.15)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: ff, fontSize: 10, color: primaryColor, fontWeight: 600, letterSpacing: 1 }}>
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        style={{
                          fontFamily: ff,
                          fontSize: 13,
                          color: textColor,
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "color 0.2s",
                          wordBreak: "break-all",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = primaryColor)}
                        onMouseLeave={(e) => (e.target.style.color = textColor)}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div style={{ fontFamily: ff, fontSize: 13, color: textColor, fontWeight: 600 }}>
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form - responsive */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid rgba(220,38,38,0.15)`,
              borderRadius: 24,
              padding: "28px 24px",
              backdropFilter: "blur(10px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(30px)",
              transition: "all 0.6s ease-out 0.2s",
              position: "relative",
            }}
          >
            <h3
              style={{
                fontFamily: ff,
                fontSize: 22,
                fontWeight: 700,
                color: textColor,
                marginBottom: 8,
              }}
            >
              {lang === "ar" ? "أرسل لي رسالة" : "Send me a message"}
            </h3>
            <p
              style={{
                fontFamily: ff,
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                marginBottom: 28,
              }}
            >
              {lang === "ar" ? "سأتواصل معك في أقرب وقت" : "I'll get back to you as soon as possible"}
            </p>

            {/* رسالة النجاح */}
            {submitStatus === "success" && (
              <div
                style={{
                  background: "rgba(34,197,94,0.15)",
                  border: "1px solid #22c55e",
                  borderRadius: 12,
                  padding: "10px 16px",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>
                  {lang === "ar" ? "✓ تم إرسال رسالتك بنجاح! سأتواصل معك قريباً" : "✓ Message sent successfully! I'll get back to you soon"}
                </span>
              </div>
            )}

            {/* رسالة الخطأ */}
            {submitStatus === "error" && (
              <div
                style={{
                  background: "rgba(220,38,38,0.15)",
                  border: "1px solid #dc2626",
                  borderRadius: 12,
                  padding: "10px 16px",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#dc2626", fontSize: 13, fontWeight: 600 }}>
                  {lang === "ar" ? "✗ حدث خطأ، الرجاء المحاولة مرة أخرى" : "✗ Something went wrong, please try again"}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New message from your portfolio!" />
              <input type="hidden" name="_template" value="table" />

              <input
                type="text"
                name="name"
                placeholder={lang === "ar" ? "الاسم" : "Your name"}
                required
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(220,38,38,0.2)`,
                  borderRadius: 14,
                  padding: "14px 18px",
                  fontFamily: ff,
                  fontSize: 14,
                  color: textColor,
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(220,38,38,0.2)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />

              <input
                type="email"
                name="email"
                placeholder={lang === "ar" ? "البريد الإلكتروني" : "Your email"}
                required
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(220,38,38,0.2)`,
                  borderRadius: 14,
                  padding: "14px 18px",
                  fontFamily: ff,
                  fontSize: 14,
                  color: textColor,
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(220,38,38,0.2)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />

              <textarea
                name="message"
                rows="4"
                placeholder={lang === "ar" ? "رسالتك..." : "Your message..."}
                required
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(220,38,38,0.2)`,
                  borderRadius: 14,
                  padding: "14px 18px",
                  fontFamily: ff,
                  fontSize: 14,
                  color: textColor,
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(220,38,38,0.2)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, #991b1b)`,
                  border: "none",
                  borderRadius: 14,
                  padding: "14px 24px",
                  fontFamily: ff,
                  fontSize: 15,
                  fontWeight: 700,
                  color: textColor,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  marginTop: 4,
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 10px 25px rgba(220,38,38,0.3)`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isSubmitting 
                  ? (lang === "ar" ? "جاري الإرسال..." : "Sending...") 
                  : (lang === "ar" ? "إرسال الرسالة →" : "Send Message →")}
              </button>
            </form>
          </div>
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