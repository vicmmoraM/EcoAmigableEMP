import { useState } from 'react';
import MapComponent from '../components/mapa/MapComponent';
import { recyclingPoints, pointTypes } from '../data/recyclingPoints';
import type { RecyclingPoint } from '../data/recyclingPoints';

const Mapa = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nearestPoint, setNearestPoint] = useState<RecyclingPoint | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Calcular distancia usando fórmula de Haversine
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Encontrar punto más cercano
  const findNearestPoint = (userLat: number, userLon: number) => {
    let nearest: RecyclingPoint | null = null;
    let minDistance = Infinity;

    recyclingPoints.forEach((point) => {
      const dist = calculateDistance(userLat, userLon, point.coords[0], point.coords[1]);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = point;
      }
    });

    setDistance(minDistance);
    setNearestPoint(nearest);
  };

  // Obtener ubicación del usuario
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Tu navegador no soporta geolocalización');
      return;
    }

    setIsLoading(true);
    setLocationStatus('Obteniendo tu ubicación...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation([lat, lng]);
        setLocationStatus('Ubicación obtenida');
        setIsLoading(false);
        findNearestPoint(lat, lng);
      },
      (error) => {
        setIsLoading(false);
        let errorMsg = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Permiso de ubicación denegado. Activa los permisos en tu navegador.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'Ubicación no disponible.';
            break;
          case error.TIMEOUT:
            errorMsg = 'Tiempo de espera agotado.';
            break;
          default:
            errorMsg = 'Error al obtener ubicación.';
        }
        setLocationStatus(errorMsg);
      }
    );
  };

  // Filtrar puntos
  const filteredPoints = recyclingPoints.filter(point => {
    const matchesType = selectedType === 'todos' || point.type === selectedType;
    const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         point.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Obtener color por tipo
  const getColorByType = (type: string) => {
    const typeConfig = pointTypes.find(t => t.id === type);
    return typeConfig?.color || '#5B8A72';
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="page-header">
        <h1>Puntos de Reciclaje</h1>
        <p className="subtitle">
          Encuentra los centros de reciclaje más cercanos a tu hogar. Consulta horarios y tipos de residuos que aceptan.
        </p>
      </header>

      {/* Barra de búsqueda y filtros */}
      <div className="map-controls">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o dirección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <div className="filter-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Filtrar por sector
          </div>
          <div className="filter-buttons">
            {pointTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                style={{
                  borderColor: selectedType === type.id ? type.color : '#E5E7EB',
                  background: selectedType === type.id ? type.color : 'white',
                  color: selectedType === type.id ? 'white' : '#6B7280'
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botón de ubicación */}
      <div className="location-section">
        <button
          onClick={getLocation}
          disabled={isLoading}
          className="location-button"
        >
          {isLoading ? (
            <>
              <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
              Obteniendo ubicación...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Activar mi Ubicación
            </>
          )}
        </button>
        {locationStatus && (
          <p
            className="location-status"
            style={{
              color: locationStatus.includes('obtenida') ? '#4CAF50' :
                     locationStatus.includes('Obteniendo') ? '#2196F3' : '#f44336'
            }}
          >
            {locationStatus}
          </p>
        )}
      </div>

      {/* Info del punto más cercano */}
      {nearestPoint && distance && (
        <div className="nearest-point-info">
          <div className="nearest-badge-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4CAF50"/>
              <path d="M2 17L12 22L22 17" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Punto más cercano</h3>
          </div>
          <div className="nearest-content">
            <h4>{nearestPoint.name}</h4>
            <div className="nearest-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span><strong>Distancia:</strong> {distance.toFixed(2)} km</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span><strong>Materiales:</strong> {nearestPoint.materials}</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span><strong>Horario:</strong> {nearestPoint.hours}</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 20.4477 9.44772 20 10 20H14C14.5523 20 15 20.4477 15 21M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{nearestPoint.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mapa */}
      <div className="map-container">
        <MapComponent
          points={filteredPoints}
          userLocation={userLocation}
          onPointClick={(point) => {
            setNearestPoint(point);
            if (userLocation) {
              const dist = calculateDistance(
                userLocation[0],
                userLocation[1],
                point.coords[0],
                point.coords[1]
              );
              setDistance(dist);
            }
          }}
        />
      </div>

      {/* Lista de puntos */}
      <div className="points-section">
        <div className="points-header">
          <h2 className="section-title">
            {filteredPoints.length} {filteredPoints.length === 1 ? 'Punto encontrado' : 'Puntos encontrados'}
          </h2>
          <p className="points-subtitle">
            {selectedType !== 'todos' 
              ? `Mostrando ${pointTypes.find(t => t.id === selectedType)?.label.toLowerCase()}`
              : 'Mostrando todos los puntos de reciclaje'}
          </p>
        </div>

        <div className="points-grid">
          {filteredPoints.map((point) => (
            <div key={point.id} className="point-card">
              <div className="point-card-header">
                <div 
                  className="point-type-badge"
                  style={{ background: getColorByType(point.type) }}
                >
                  {pointTypes.find(t => t.id === point.type)?.label}
                </div>
                {nearestPoint?.id === point.id && distance && (
                  <div className="nearest-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                    </svg>
                    Más cercano
                  </div>
                )}
              </div>

              <h3>{point.name}</h3>
              
              {point.description && (
                <p className="point-description">{point.description}</p>
              )}

              <div className="point-details">
                <div className="point-detail">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{point.materials}</span>
                </div>
                <div className="point-detail">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{point.hours}</span>
                </div>
                <div className="point-detail">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{point.address}</span>
                </div>
                {point.phone && (
                  <div className="point-detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92V19.92C22 20.4728 21.5523 20.92 21 20.92H19C9.61116 20.92 2 13.3088 2 3.92V1.92C2 1.36772 2.44772 0.92 3 0.92H6C6.55228 0.92 7 1.36772 7 1.92V5.92L5.5 7.42C6.86954 10.1542 9.26579 12.5504 12 13.92L13.5 12.42H17.5C18.0523 12.42 18.5 12.8677 18.5 13.42V16.42C18.5 16.9723 18.9477 17.42 19.5 17.42H21C21.5523 17.42 22 17.8677 22 18.42V19.92Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{point.phone}</span>
                  </div>
                )}
              </div>

              {userLocation && (
                <div className="point-distance">
                  A {calculateDistance(userLocation[0], userLocation[1], point.coords[0], point.coords[1]).toFixed(2)} km de tu ubicación
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="info-box" style={{ marginTop: '60px' }}>
        <h3>💡 Información importante</h3>
        <p>
          Los <strong>centros municipales URVASEO</strong> están abiertos todos los días de 7:00 a 21:00 y son gratuitos. 
          Son ideales para depositar residuos voluminosos como muebles, electrodomésticos, poda y escombros.
        </p>
        <p style={{ marginTop: '10px' }}>
          Para reciclaje de <strong>electrónicos</strong>, dirígete a centros especializados como RENOVAELEC o ReciclaElectronic.
        </p>
      </div>
    </div>
  );
};

export default Mapa;