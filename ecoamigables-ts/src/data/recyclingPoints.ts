export interface RecyclingPoint {
  id: number;
  coords: [number, number];
  name: string;
  materials: string;
  hours: string;
  address: string;
  type: 'principal' | 'municipal' | 'electronico' | 'otro';
  phone?: string;
  description?: string;
}

export const recyclingPoints: RecyclingPoint[] = [
  // Centros principales y recicladores
  {
    id: 1,
    coords: [-2.1894, -79.8875],
    name: 'RENOVAELEC S.A.S',
    materials: 'Electrónicos, equipos, cables',
    hours: 'Lun-Vie: 8:00-17:00',
    address: 'Av. Francisco de Orellana, Guayaquil',
    type: 'electronico',
    description: 'Especializado en reciclaje electrónico. Ideal para equipos, cables y desechos tecnológicos.'
  },
  {
    id: 2,
    coords: [-2.1709, -79.9224],
    name: 'Recicladora Guayaquil',
    materials: 'Papel, cartón, plástico, metales',
    hours: 'Lun-Sab: 8:00-18:00',
    address: 'Av. Luis Plaza Dañín, Kennedy Norte',
    type: 'principal',
    description: 'Centro de acopio de residuos reciclables variados. Muy accesible para materiales reutilizables.'
  },
  {
    id: 3,
    coords: [-2.2153, -79.8862],
    name: 'Fibras Nacionales S.A.',
    materials: 'Papel, cartón, fibras',
    hours: 'Lun-Vie: 7:30-17:00',
    address: 'Av. 25 de Julio, Urdesa',
    type: 'principal',
    description: 'Recicladora enfocada en papel, cartón y fibras. Una de las más experimentadas de la ciudad.'
  },
  {
    id: 4,
    coords: [-2.1456, -79.9012],
    name: 'ReciclaElectronic S.A.',
    materials: 'Equipos electrónicos, computadoras, celulares',
    hours: 'Lun-Vie: 9:00-18:00',
    address: 'Cdla. Kennedy, Guayaquil',
    type: 'electronico',
    description: 'Especializado en reciclaje de residuos electrónicos y tecnología.'
  },
  {
    id: 5,
    coords: [-2.1678, -79.9156],
    name: 'Ecorecicla S.A.',
    materials: 'Varios tipos de materiales reciclables',
    hours: 'Lun-Sab: 8:00-17:00',
    address: 'Alborada, Guayaquil',
    type: 'principal',
    description: 'Centro con enfoque ecológico, apto para varios tipos de materiales reciclables.'
  },
  {
    id: 6,
    coords: [-2.1534, -79.8934],
    name: 'Centro de reciclaje GMB 016',
    materials: 'Materiales reciclables generales',
    hours: 'Lun-Vie: 8:00-16:00',
    address: 'Norte de Guayaquil',
    type: 'principal',
    description: 'Punto de acopio local para reciclaje comunitario.'
  },
  
  // Centros municipales URVASEO
  {
    id: 7,
    coords: [-2.1234, -79.9045],
    name: 'Centro de Acopio URVASEO Norte',
    materials: 'Residuos voluminosos, muebles, electrodomésticos, poda',
    hours: 'Todos los días: 7:00-21:00',
    address: 'Norte de Guayaquil',
    type: 'municipal',
    description: 'Centro municipal gratuito para depositar residuos voluminosos.'
  },
  {
    id: 8,
    coords: [-2.2456, -79.8923],
    name: 'Urvaseo Centro De Acopio Sur',
    materials: 'Residuos voluminosos, escombros',
    hours: 'Todos los días: 7:00-21:00',
    address: 'Sur de Guayaquil',
    type: 'municipal',
    description: 'Punto de acopio municipal para residuos grandes.'
  },
  {
    id: 9,
    coords: [-2.1890, -79.8756],
    name: 'Urvaseo Centro De Acopio Centro',
    materials: 'Residuos voluminosos, poda, escombros',
    hours: 'Todos los días: 7:00-21:00',
    address: 'Centro de Guayaquil',
    type: 'municipal',
    description: 'Centro de acopio en zona céntrica de la ciudad.'
  },
  {
    id: 10,
    coords: [-2.2134, -79.9178],
    name: 'Urvaseo Centro De Acopio Costanera',
    materials: 'Residuos voluminosos, varios tipos',
    hours: 'Todos los días: 7:00-21:00',
    address: 'Vía a la Costa, Guayaquil',
    type: 'municipal',
    description: 'Punto de acopio en zona costanera.'
  },
  
  // Otros puntos
  {
    id: 11,
    coords: [-2.1567, -79.9234],
    name: 'Puerto Limpio',
    materials: 'Reciclaje general, gestión de residuos',
    hours: 'Lun-Sab: 8:00-18:00',
    address: 'Varios sectores de Guayaquil',
    type: 'otro',
    description: 'Centro con enfoque en reciclaje general y gestión de residuos.'
  }
];

// Tipos de puntos para filtrado
export const pointTypes = [
  { id: 'todos', label: 'Todos', color: '#5B8A72' },
  { id: 'principal', label: 'Centros Principales', color: '#4CAF50' },
  { id: 'electronico', label: 'Reciclaje Electrónico', color: '#2196F3' },
  { id: 'municipal', label: 'Centros Municipales', color: '#FF9800' },
  { id: 'otro', label: 'Otros', color: '#9E9E9E' }
];