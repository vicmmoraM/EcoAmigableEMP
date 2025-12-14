import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/guias/Modal';

type ModalType = 'colors' | 'symbols' | 'decomposition' | 'organicos' | 'plastico' | 'vidrio' | 'papel' | 'metales' | 'peligrosos' | null;

const Guias = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  // Categorías principales
  const mainCategories = [
    {
      id: 'organicos',
      title: 'Orgánicos',
      description: 'Residuos de origen natural que se descomponen fácilmente.',
      color: '#D4F1D7',
      textColor: '#2D5F3C',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7Z" fill="currentColor"/>
        </svg>
      ),
      ejemplos: [
        'Restos de frutas y verduras',
        'Cáscaras de huevo',
        'Posos de café y bolsitas de té',
        'Restos de comida (sin grasa)',
        'Flores y plantas marchitas',
        'Hojas secas y ramas pequeñas'
      ],
      comoReciclar: [
        'Separa los residuos orgánicos en un contenedor aparte',
        'Mantén el contenedor cerrado para evitar olores',
        'Considera crear compost casero',
        'NO mezcles con plásticos o papel',
        'Entrega al recolector de basura orgánica'
      ],
      beneficios: [
        'Se convierten en abono natural (compost)',
        'Reducen el espacio en vertederos',
        'Disminuyen emisiones de metano',
        'Mejoran la calidad del suelo'
      ],
      tiempo: '3-6 meses en descomponerse'
    },
    {
      id: 'plastico',
      title: 'Plástico',
      description: 'Envases y productos plásticos reciclables.',
      color: '#FFF4E0',
      textColor: '#8B6914',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M2 3H6L7 9L5 17H19L17 9L18 3H22L20 17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17L2 3M9 6H15V8H9V6M9 10H15V12H9V10Z" fill="currentColor"/>
        </svg>
      ),
      ejemplos: [
        'Botellas de agua y refrescos (PET)',
        'Envases de champú y detergente (HDPE)',
        'Tapas de botellas (PP)',
        'Bolsas de plástico limpias',
        'Envases de yogurt y margarina',
        'Juguetes de plástico'
      ],
      comoReciclar: [
        'Enjuaga los envases antes de reciclar',
        'Separa las tapas del cuerpo de las botellas',
        'Aplasta las botellas para ahorrar espacio',
        'Identifica el número de reciclaje (1-7)',
        'NO incluyas plástico contaminado con comida',
        'Lleva al punto de reciclaje o contenedor amarillo'
      ],
      beneficios: [
        'Una botella puede reciclarse en 5 nuevas botellas',
        'Ahorra 70% de energía vs. fabricar plástico nuevo',
        'Reduce contaminación en océanos',
        'El plástico reciclado tiene valor comercial'
      ],
      tiempo: '100-1000 años en degradarse'
    },
    {
      id: 'vidrio',
      title: 'Vidrio',
      description: 'Botellas, frascos y envases de vidrio.',
      color: '#D7F0F7',
      textColor: '#1A5F7A',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2Z" fill="currentColor"/>
        </svg>
      ),
      ejemplos: [
        'Botellas de vino y cerveza',
        'Frascos de mermelada y conservas',
        'Envases de perfumes',
        'Tarros de vidrio',
        'Botellas de aceite',
        'Vasos de vidrio'
      ],
      comoReciclar: [
        'Enjuaga bien los envases',
        'Retira tapas metálicas o de plástico',
        'NO incluyas vidrios rotos sin protección',
        'Separa por color si es posible (verde, ámbar, transparente)',
        'NO mezcles con cristal, espejos o bombillas',
        'Lleva al contenedor verde o punto de acopio'
      ],
      beneficios: [
        'Se puede reciclar infinitas veces sin perder calidad',
        'Ahorra 30% de energía vs. vidrio nuevo',
        'Una tonelada de vidrio reciclado ahorra 1.2 toneladas de materia prima',
        'El vidrio reciclado es 100% puro'
      ],
      tiempo: '4000 años o más en degradarse'
    },
    {
      id: 'papel',
      title: 'Papel y Cartón',
      description: 'Papel, cartón y productos de celulosa.',
      color: '#E5E7F8',
      textColor: '#3D4B8F',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M8 15H16V17H8V15M8 11H16V13H8V11Z" fill="currentColor"/>
        </svg>
      ),
      ejemplos: [
        'Periódicos y revistas',
        'Cajas de cartón',
        'Papel de oficina',
        'Cuadernos y libros',
        'Sobres (sin ventana plástica)',
        'Cartones de huevos',
        'Rollos de papel higiénico'
      ],
      comoReciclar: [
        'Mantén el papel seco y limpio',
        'Aplasta las cajas de cartón',
        'Retira grapas, clips y espirales',
        'NO incluyas papel plastificado o encerado',
        'NO recicles papel con restos de comida o grasa',
        'Ata el papel en paquetes o usa bolsas',
        'Lleva al punto de acopio o contenedor azul'
      ],
      beneficios: [
        'Una tonelada de papel reciclado salva 17 árboles',
        'Ahorra 26,000 litros de agua',
        'Consume 60% menos energía',
        'Reduce residuos en vertederos en un 35%'
      ],
      tiempo: '2-5 meses en descomponerse'
    },
    {
      id: 'metales',
      title: 'Metales',
      description: 'Latas, envases metálicos y aluminio.',
      color: '#E8E8E8',
      textColor: '#4A4A4A',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      ),
      ejemplos: [
        'Latas de aluminio (refrescos, cerveza)',
        'Latas de conservas (atún, vegetales)',
        'Papel aluminio',
        'Tapas metálicas de frascos',
        'Cables y alambres',
        'Utensilios de cocina metálicos'
      ],
      comoReciclar: [
        'Enjuaga las latas antes de reciclar',
        'Aplasta las latas para ahorrar espacio',
        'Separa por tipo de metal si es posible',
        'NO incluyas metales con restos de pintura tóxica',
        'Retira etiquetas de papel si es posible',
        'Lleva al punto de reciclaje o chatarrero'
      ],
      beneficios: [
        'El aluminio se recicla infinitas veces',
        'Ahorra 95% de energía vs. aluminio nuevo',
        'Una lata reciclada puede estar de vuelta en 60 días',
        'Reduce la minería y contaminación del suelo'
      ],
      tiempo: '200-500 años en oxidarse completamente'
    },
    {
      id: 'peligrosos',
      title: 'Peligrosos',
      description: 'Pilas, baterías, medicamentos y químicos.',
      color: '#FFE5E5',
      textColor: '#A72C2C',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L1 21H23M12 6L19.53 19H4.47M11 10V14H13V10M11 16V18H13V16" fill="currentColor"/>
        </svg>
      ),
      ejemplos: [
        'Pilas y baterías',
        'Medicamentos vencidos',
        'Productos de limpieza',
        'Aceites de motor',
        'Pinturas y solventes',
        'Pesticidas e insecticidas',
        'Termómetros de mercurio'
      ],
      comoReciclar: [
        'NUNCA los tires a la basura común',
        'Guárdalos en recipientes seguros',
        'Lleva pilas a puntos de recolección especializados',
        'Medicamentos: devuélvelos a farmacias',
        'Aceites: llévalos a centros de acopio',
        'NO mezcles diferentes tipos de residuos peligrosos',
        'Consulta con tu municipio para puntos de recolección'
      ],
      beneficios: [
        'Previene contaminación de suelos y agua',
        'Evita intoxicaciones y enfermedades',
        'Permite recuperar materiales valiosos',
        'Protege ecosistemas y vida silvestre'
      ],
      tiempo: 'Pueden contaminar durante décadas o siglos'
    }
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="page-header">
        <h1>Guía de Residuos</h1>
        <p className="subtitle">
          Aprende a identificar y separar cada tipo de residuo correctamente. Selecciona una categoría para ver ejemplos y consejos detallados.
        </p>
      </header>

      {/* Categorías principales */}
      <div className="categories-main-grid">
        {mainCategories.map((category) => (
          <div
            key={category.id}
            className="category-main-card"
            style={{ background: category.color, color: category.textColor }}
          >
            <div className="category-main-icon">{category.icon}</div>
            <h3 className="category-main-title">{category.title}</h3>
            <p className="category-main-description">{category.description}</p>
            <button 
              className="category-main-button" 
              style={{ color: category.textColor }}
              onClick={() => openModal(category.id as ModalType)}
            >
              Ver más
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Modales para cada categoría */}
      {mainCategories.map((category) => (
        <Modal key={category.id} isOpen={activeModal === category.id} onClose={closeModal}>
          <div className="modal-info-content">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: category.color, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                color: category.textColor
              }}>
                {category.icon}
              </div>
              <h2 style={{ color: category.textColor, fontSize: '2.5em', marginBottom: '10px' }}>
                {category.title}
              </h2>
              <p style={{ fontSize: '1.2em', color: '#666' }}>{category.description}</p>
            </div>

            <div style={{ 
              background: category.color, 
              padding: '20px', 
              borderRadius: '15px', 
              marginBottom: '25px' 
            }}>
              <h3 style={{ color: category.textColor, fontSize: '1.5em', marginBottom: '15px' }}>
                Ejemplos de {category.title}
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px'
              }}>
                {category.ejemplos.map((ejemplo, idx) => (
                  <li key={idx} style={{ 
                    padding: '10px 15px', 
                    background: 'white', 
                    borderRadius: '10px',
                    fontSize: '1em',
                    color: '#333'
                  }}>
                    • {ejemplo}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: category.textColor, fontSize: '1.5em', marginBottom: '15px' }}>
                ¿Cómo reciclar correctamente?
              </h3>
              <ol style={{ 
                paddingLeft: '20px',
                lineHeight: '1.8'
              }}>
                {category.comoReciclar.map((paso, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: '10px',
                    fontSize: '1.05em',
                    color: '#555'
                  }}>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ 
              background: '#E8F5E9', 
              padding: '20px', 
              borderRadius: '15px',
              marginBottom: '25px'
            }}>
              <h3 style={{ color: '#2e7d32', fontSize: '1.5em', marginBottom: '15px' }}>
                Beneficios del Reciclaje
              </h3>
              <div style={{ 
                display: 'grid',
                gap: '12px'
              }}>
                {category.beneficios.map((beneficio, idx) => (
                  <div key={idx} style={{ 
                    padding: '12px 15px', 
                    background: 'white', 
                    borderRadius: '10px',
                    fontSize: '1.05em',
                    color: '#333',
                    borderLeft: '4px solid #4CAF50'
                  }}>
                    {beneficio}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              background: '#FFF3E0', 
              padding: '15px 20px', 
              borderRadius: '10px',
              borderLeft: '5px solid #FF9800',
              textAlign: 'center'
            }}>
              <strong style={{ color: '#E65100', fontSize: '1.1em' }}>
                ⏱ Tiempo de descomposición: {category.tiempo}
              </strong>
            </div>
          </div>
        </Modal>
      ))}

      {/* Información educativa */}
      <div className="info-box" style={{ marginTop: '60px' }}>
        <h2>¿Cómo separar residuos en casa?</h2>
        <p>
          La separación correcta de residuos es el primer paso para un reciclaje efectivo.
          Utiliza contenedores diferentes y sigue estas categorías básicas para comenzar.
        </p>
      </div>

      {/* Videos educativos */}
      <div className="videos-section">
        <h2 className="section-title">Videos Educativos</h2>
        <div className="videos-grid">
          <div className="video-card">
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/6jQ7y_qQYUA?si=CK0361-SOSxEQPJ7"
                title="¿Qué es el Reciclaje?"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <h3>¿Qué es el Reciclaje?</h3>
            <p>Conceptos básicos sobre reciclaje y su importancia</p>
          </div>

          <div className="video-card">
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/nRslXWbfa8w?si=2YXwwmFy_r0-D0yl"
                title="Cómo Separar en Casa"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <h3>Cómo Separar en Casa</h3>
            <p>Técnicas efectivas de separación de residuos</p>
          </div>

          <div className="video-card">
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WOR0ytnVuB4?si=lxnzMy0OzjoVtMFz"
                title="Reciclaje de Plásticos"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <h3>Reciclaje de Plásticos</h3>
            <p>Tipos de plásticos y cómo reciclarlos</p>
          </div>
        </div>
      </div>

      {/* Infografías */}
      <div className="infographics-section">
        <h2 className="section-title">Infografías Educativas</h2>
        <div className="infographics-grid">
          <div className="infographic-card" onClick={() => openModal('colors')}>
            <div className="infographic-preview">
              <div className="preview-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19Z" fill="white"/>
                </svg>
              </div>
              <h4>Separación por Colores</h4>
            </div>
            <h4>Separación por Colores</h4>
            <p className="click-hint">Click para ampliar</p>
          </div>

          <div className="infographic-card" onClick={() => openModal('symbols')}>
            <div className="infographic-preview">
              <div className="preview-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M21.82 15.42L19.32 19.75C18.96 20.37 18.29 20.75 17.56 20.75H6.44C5.71 20.75 5.04 20.37 4.68 19.75L2.18 15.42C1.97 15.06 1.97 14.63 2.18 14.27L4.68 9.94C5.04 9.32 5.71 8.94 6.44 8.94H17.56C18.29 8.94 18.96 9.32 19.32 9.94L21.82 14.27C22.03 14.63 22.03 15.06 21.82 15.42Z" fill="white"/>
                </svg>
              </div>
              <h4>Símbolos de Reciclaje</h4>
            </div>
            <h4>Símbolos de Reciclaje</h4>
            <p className="click-hint">Click para ampliar</p>
          </div>

          <div className="infographic-card" onClick={() => openModal('decomposition')}>
            <div className="infographic-preview">
              <div className="preview-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="white"/>
                </svg>
              </div>
              <h4>Tiempo de Descomposición</h4>
            </div>
            <h4>Tiempo de Descomposición</h4>
            <p className="click-hint">Click para ampliar</p>
          </div>
        </div>
      </div>

      {/* Modales originales */}
      <Modal isOpen={activeModal === 'colors'} onClose={closeModal}>
        <div className="modal-info-content">
          <h2 style={{ color: '#4CAF50', textAlign: 'center', marginBottom: '30px' }}>
            Separación por Colores
          </h2>
          <div className="color-categories">
            <div className="color-item green">
              <h3>Verde - Reciclables</h3>
              <p>Papel, cartón, plástico, vidrio, latas</p>
            </div>
            <div className="color-item yellow">
              <h3>Amarillo - Orgánicos</h3>
              <p>Restos de comida, cáscaras, residuos de jardín</p>
            </div>
            <div className="color-item red">
              <h3>Rojo - Peligrosos</h3>
              <p>Pilas, baterías, medicamentos, químicos</p>
            </div>
            <div className="color-item gray">
              <h3>Gris - No Reciclables</h3>
              <p>Residuos sanitarios, papel sucio, otros</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'symbols'} onClose={closeModal}>
        <div className="modal-info-content">
          <h2 style={{ color: '#2196F3', textAlign: 'center', marginBottom: '30px' }}>
            Símbolos de Reciclaje
          </h2>
          <div className="symbols-grid">
            <div className="symbol-item">
              <div className="symbol-number">①</div>
              <strong>PET</strong>
              <p>Botellas de agua</p>
            </div>
            <div className="symbol-item">
              <div className="symbol-number">②</div>
              <strong>HDPE</strong>
              <p>Envases de leche</p>
            </div>
            <div className="symbol-item">
              <div className="symbol-number">③</div>
              <strong>PVC</strong>
              <p>Tuberías</p>
            </div>
            <div className="symbol-item">
              <div className="symbol-number">④</div>
              <strong>LDPE</strong>
              <p>Bolsas plásticas</p>
            </div>
            <div className="symbol-item">
              <div className="symbol-number">⑤</div>
              <strong>PP</strong>
              <p>Tapas de botellas</p>
            </div>
            <div className="symbol-item">
              <div className="symbol-number">⑥</div>
              <strong>PS</strong>
              <p>Vasos desechables</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'decomposition'} onClose={closeModal}>
        <div className="modal-info-content">
          <h2 style={{ color: '#FF9800', textAlign: 'center', marginBottom: '30px' }}>
            Tiempo de Descomposición
          </h2>
          <div className="decomposition-list">
            <div className="decomp-item">
              <strong>Papel:</strong> 2-5 meses
            </div>
            <div className="decomp-item">
              <strong>Restos orgánicos:</strong> 3-6 meses
            </div>
            <div className="decomp-item">
              <strong>Lata de aluminio:</strong> 200-500 años
            </div>
            <div className="decomp-item">
              <strong>Botella de plástico:</strong> 100-1000 años
            </div>
            <div className="decomp-item">
              <strong>Botella de vidrio:</strong> 4000 años o más
            </div>
            <div className="decomp-item">
              <strong>Zapatos de cuero:</strong> 25-40 años
            </div>
          </div>
        </div>
      </Modal>

      {/* Tips rápidos */}
      <div className="tips-section">
        <h2>Tips Rápidos</h2>
        <div className="tips-grid">
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p>Aplasta las botellas para ahorrar espacio</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p>Separa las tapas de los envases</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p>Usa contenedores de colores diferentes</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p>Composta tus residuos orgánicos</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✓</span>
            <p>Consulta el mapa de puntos de reciclaje</p>
          </div>
        </div>
      </div>

      {/* Recursos adicionales */}
      <div className="resources-section">
        <h2 className="section-title">Recursos Adicionales</h2>
        <div className="resources-grid">
          <a href="https://www.ambiente.gob.ec/" target="_blank" rel="noopener noreferrer" className="resource-card">
            <div className="resource-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#5B8A72"/>
              </svg>
            </div>
            <h4>Ministerio del Ambiente</h4>
            <p>Información oficial sobre reciclaje en Ecuador</p>
          </a>
          <a href="https://www.guayaquil.gob.ec/" target="_blank" rel="noopener noreferrer" className="resource-card">
            <div className="resource-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L2 12H5V20H19V12H22L12 3M12 8.75C13.24 8.75 14.25 9.76 14.25 11S13.24 13.25 12 13.25 9.75 12.24 9.75 11 10.76 8.75 12 8.75Z" fill="#5B8A72"/>
              </svg>
            </div>
            <h4>Municipio de Guayaquil</h4>
            <p>Programas de reciclaje locales</p>
          </a>
          <a href="https://gira.com.ec/" target="_blank" rel="noopener noreferrer" className="resource-card">
            <div className="resource-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21.82 15.42L19.32 19.75C18.96 20.37 18.29 20.75 17.56 20.75H6.44C5.71 20.75 5.04 20.37 4.68 19.75L2.18 15.42C1.97 15.06 1.97 14.63 2.18 14.27L4.68 9.94C5.04 9.32 5.71 8.94 6.44 8.94H17.56C18.29 8.94 18.96 9.32 19.32 9.94L21.82 14.27C22.03 14.63 22.03 15.06 21.82 15.42Z" fill="#5B8A72"/>
              </svg>
            </div>
            <h4>Recicla Ecuador</h4>
            <p>Guías y campañas de reciclaje</p>
          </a>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="action-section">
        <button onClick={() => navigate('/mapa')} className="action-button">
          Ver Puntos de Reciclaje
        </button>
      </div>
    </div>
  );
};

export default Guias;