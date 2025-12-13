import { Link, useLocation } from 'react-router-dom';
import LogoIcon from '../../assets/ecoamigables-logo.svg';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar-new">
      <div className="nav-container-new">
        <Link to="/" className="nav-logo-new">
          <div className="logo-icon-new">
            {/* 2. INSERCIÓN DEL LOGO IMPORTADO */}
            {/* Se renderiza el SVG como una imagen, especificando el tamaño. */}
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
            Consejos
          </Link>
        </div>

        <button className="user-button">
          {/* Ícono de usuario (se mantiene el SVG original) */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;