import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RecyclingPoint } from '../../data/recyclingPoints';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icono personalizado para puntos de reciclaje
const recyclingIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Icono para ubicación del usuario
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapComponentProps {
  points: RecyclingPoint[];
  userLocation: [number, number] | null;
  onPointClick?: (point: RecyclingPoint) => void;
}

// Componente para centrar el mapa cuando cambia la ubicación
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

const MapComponent = ({ points, userLocation, onPointClick }: MapComponentProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.1894, -79.8875]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '15px' }}
    >
      <MapUpdater center={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Marcadores de puntos de reciclaje */}
      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.coords}
          icon={recyclingIcon}
          eventHandlers={{
            click: () => onPointClick && onPointClick(point)
          }}
        >
          <Popup>
            <div style={{ padding: '10px', minWidth: '250px' }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px', fontSize: '1.2em' }}>
                {point.name}
              </h3>
              <p style={{ margin: '5px 0', fontSize: '0.95em' }}>
                <strong>📦 Materiales:</strong> {point.materials}
              </p>
              <p style={{ margin: '5px 0', fontSize: '0.95em' }}>
                <strong>🕐 Horario:</strong> {point.hours}
              </p>
              <p style={{ margin: '5px 0', fontSize: '0.95em' }}>
                <strong>📍 Dirección:</strong> {point.address}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Marcador de ubicación del usuario */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div style={{ padding: '10px' }}>
              <strong style={{ color: '#2196F3' }}>📍 Tu ubicación</strong>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;