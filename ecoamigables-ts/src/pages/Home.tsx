import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { 
      name: 'Orgánicos', 
      color: '#D4F1D7', 
      textColor: '#2D5F3C',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Plástico', 
      color: '#FFF4E0', 
      textColor: '#8B6914',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M2 3H6L7 9L5 17H19L17 9L18 3H22L20 17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17L2 3M9 6H15V8H9V6M9 10H15V12H9V10Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Vidrio', 
      color: '#D7F0F7', 
      textColor: '#1A5F7A',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Papel y Cartón', 
      color: '#E5E7F8', 
      textColor: '#3D4B8F',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M8 15H16V17H8V15M8 11H16V13H8V11Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Metales', 
      color: '#E8E8E8', 
      textColor: '#4A4A4A',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Peligrosos', 
      color: '#FFE5E5', 
      textColor: '#A72C2C',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L1 21H23M12 6L19.53 19H4.47M11 10V14H13V10M11 16V18H13V16" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <div className="home-new">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="currentColor"/>
          </svg>
          Tu guía para un hogar sostenible
        </div>
        
        <h1 className="hero-title">
          Haz que tu hogar sea <span className="hero-highlight">parte del cambio</span>
        </h1>
        
        <p className="hero-subtitle">
          Aprende a separar tus residuos de forma sencilla y contribuye a un planeta
          más limpio. Juntos podemos hacer la diferencia.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate('/guias')} className="btn-primary-new">
            Aprende a Separar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => navigate('/mapa')} className="btn-secondary-new">
            Ver Puntos de Reciclaje
          </button>
        </div>

        {/* Decorative icons */}
        <div className="floating-icon floating-icon-1">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M21.82 15.42L19.32 19.75C18.96 20.37 18.29 20.75 17.56 20.75H6.44C5.71 20.75 5.04 20.37 4.68 19.75L2.18 15.42C1.97 15.06 1.97 14.63 2.18 14.27L4.68 9.94C5.04 9.32 5.71 8.94 6.44 8.94H17.56C18.29 8.94 18.96 9.32 19.32 9.94L21.82 14.27C22.03 14.63 22.03 15.06 21.82 15.42M17 14.85L15.15 11.58L16.44 10.29L14 7.85L11.56 10.29L12.85 11.58L11 14.85L8.71 10.29L7 11.58L9.44 7.85L7 5.41L9.44 3L11.88 5.41L10.59 6.7L14 12.41L17.41 6.7L16.12 5.41L18.56 3L21 5.41L18.56 7.85L21 11.58L19.29 10.29L17 14.85Z" fill="#5B8A72"/>
          </svg>
        </div>
        <div className="floating-icon floating-icon-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="#5B8A72"/>
          </svg>
        </div>
      </section>

      {/* Stats Section with animated counters */}
      <StatsSection isVisible={isVisible} />

      {/* Features Section */}
      <section className="features-section-new">
        <h2 className="section-title-new">¿Qué te ofrecemos?</h2>
        <p className="section-subtitle-new">
          Herramientas simples y efectivas para que tú y tu familia puedan reciclar correctamente desde casa.
        </p>
        
        <div className="features-grid-new">
          <div className="feature-card-new">
            <div className="feature-icon-wrapper" style={{ background: '#D4F1D7' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#2D5F3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke="#2D5F3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Educación Ambiental Sencilla</h3>
            <p>Aprende sobre el impacto de tus residuos y cómo puedes contribuir al medio ambiente de forma práctica y accesible.</p>
          </div>

          <div className="feature-card-new">
            <div className="feature-icon-wrapper" style={{ background: '#FFF4E0' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Guía de Separación</h3>
            <p>Descubre cómo clasificar cada tipo de residuo correctamente con ejemplos claros y consejos fáciles de seguir.</p>
          </div>

          <div className="feature-card-new">
            <div className="feature-icon-wrapper" style={{ background: '#D7F0F7' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#1A5F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#1A5F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Mapa de Puntos de Reciclaje</h3>
            <p>Encuentra los centros de reciclaje más cercanos a tu hogar con horarios y tipos de residuos que aceptan.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-content">
          <div className="categories-text">
            <h2 className="section-title-new">Aprende a clasificar cada tipo de residuo</h2>
            <p className="section-subtitle-new">
              Nuestra guía te ayuda a identificar y separar correctamente los diferentes tipos de residuos que generas en casa. Cada categoría incluye ejemplos, consejos y pasos sencillos.
            </p>
            <button onClick={() => navigate('/guias')} className="btn-primary-new">
              Ver Guía Completa
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="category-card"
                style={{ background: cat.color, color: cat.textColor }}
              >
                <div className="category-icon">{cat.icon}</div>
                <div className="category-name">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-new">
        <div className="cta-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="white"/>
          </svg>
        </div>
        <h2>Comienza hoy tu camino hacia un hogar más sostenible</h2>
        <p>Cada pequeña acción cuenta. Únete a miles de familias que ya están haciendo la diferencia desde sus hogares.</p>
        <div className="cta-buttons">
          <button onClick={() => navigate('/guias')} className="btn-white">
            Empezar Ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => navigate('/metas')} className="btn-outline-white">
            Crear Mi Perfil
          </button>
        </div>
      </section>
    </div>
  );
};

// Component for animated stats
const StatsSection = ({ isVisible }: { isVisible: boolean }) => {
  const stats = [
    { end: 6, label: 'Categorías de residuos', suffix: '' },
    { end: 50, label: 'Consejos prácticos', suffix: '+' },
    { end: 100, label: 'Puntos de reciclaje', suffix: '+' }
  ];

  return (
    <section className="stats-section-new">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} isVisible={isVisible} delay={index * 200} />
      ))}
    </section>
  );
};

// Individual stat card with counter animation
const StatCard = ({ end, label, suffix, isVisible, delay }: { 
  end: number; 
  label: string; 
  suffix: string; 
  isVisible: boolean; 
  delay: number 
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = window.setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          window.clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      countRef.current = timer;
    }, delay);

    return () => {
      if (countRef.current) window.clearInterval(countRef.current);
      clearTimeout(timeout);
    };
  }, [end, isVisible, delay]);

  return (
    <div className="stat-item-new">
      <div className="stat-number-new">{count}{suffix}</div>
      <div className="stat-label-new">{label}</div>
    </div>
  );
};

export default Home;