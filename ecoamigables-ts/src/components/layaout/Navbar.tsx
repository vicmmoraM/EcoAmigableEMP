import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LogoIcon from '../../assets/ecoamigables-logo.svg';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar-new">
      <div className="nav-container-new">
        <Link to="/" className="nav-logo-new">
          <div className="logo-icon-new">
            <img src={LogoIcon} alt="EcoAmigables Logo" width="75" height="75" />
          </div>
          <span className="logo-text-new">
            Eco<span className="logo-highlight">Amigables</span>
          </span>
        </Link>
        
        <div className="nav-links-new">
          <Link to="/" className={isActive('/')}>
            Inicio
          </Link>
          <Link to="/guias" className={isActive('/guias')}>
            Guía de Residuos
          </Link>
          <Link to="/mapa" className={isActive('/mapa')}>
            Puntos de Reciclaje
          </Link>
          <Link to="/metas" className={isActive('/metas')}>
            Mis Metas
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Botón de tema */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
          >
            {theme === 'light' ? (
              // Icono de luna
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
              </svg>
            ) : (
              // Icono de sol
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {/* Botón de usuario */}
          <button className="user-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;