import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ImpactPanelProps {
  completedGoals: number;
}

interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: ReactNode;
  color: string;
  description: string;
}

const ImpactPanel = ({ completedGoals }: ImpactPanelProps) => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  // Calcular impacto basado en metas completadas
  // Cada meta completada = 1 semana de reciclaje efectivo
  const calculateImpact = (): ImpactMetric[] => {
    const weeksRecycling = completedGoals;
    
    return [
      {
        id: 'co2',
        label: 'CO₂ Reducido',
        value: weeksRecycling * 2.5, // 2.5 kg por semana
        unit: 'kg',
        color: '#4CAF50',
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        description: 'Equivalente a no usar un auto por varios días'
      },
      {
        id: 'water',
        label: 'Agua Ahorrada',
        value: weeksRecycling * 15, // 15 litros por semana
        unit: 'L',
        color: '#2196F3',
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.69L17.66 8.35C18.78 9.47 19.34 10.72 19.34 12C19.34 13.28 18.78 14.53 17.66 15.65C16.54 16.77 15.28 17.34 14 17.34C12.72 17.34 11.47 16.77 10.35 15.65C9.23 14.53 8.66 13.28 8.66 12C8.66 10.72 9.23 9.47 10.35 8.35L12 2.69Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        description: 'Suficiente para ducharse varias veces'
      },
      {
        id: 'trees',
        label: 'Árboles Salvados',
        value: Math.floor(weeksRecycling * 0.3), // 0.3 árboles por semana (30%)
        unit: '',
        color: '#66BB6A',
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        description: 'Gracias al reciclaje de papel y cartón'
      },
      {
        id: 'waste',
        label: 'Residuos Evitados',
        value: weeksRecycling * 3.5, // 3.5 kg por semana
        unit: 'kg',
        color: '#FF9800',
        icon: (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        description: 'Que no llegaron a vertederos'
      }
    ];
  };

  const metrics = calculateImpact();

  // Animar los números
  useEffect(() => {
    const timers: ReturnType<typeof setInterval>[] = [];

    metrics.forEach((metric) => {
      let current = 0;
      const target = metric.value;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedValues(prev => ({ ...prev, [metric.id]: target }));
          clearInterval(timer);
        } else {
          setAnimatedValues(prev => ({ ...prev, [metric.id]: current }));
        }
      }, duration / steps);

      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [completedGoals]);

  return (
    <div className="impact-panel">
      <div className="impact-header">
        <div className="impact-header-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#4CAF50"/>
            <path d="M16.5 8.5L11 14L8.5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="impact-header-text">
          <h2>Tu Impacto Ambiental</h2>
          <p>Cada meta completada contribuye a un planeta más limpio</p>
        </div>
      </div>

      {completedGoals === 0 ? (
        <div className="impact-empty">
          <div className="impact-empty-icon">🌱</div>
          <h3>¡Completa tu primera meta!</h3>
          <p>Cuando completes metas, verás aquí tu impacto ambiental positivo.</p>
        </div>
      ) : (
        <div className="impact-grid">
          {metrics.map((metric) => (
            <div 
              key={metric.id} 
              className="impact-metric-card"
              style={{ borderLeftColor: metric.color }}
            >
              <div className="impact-metric-icon" style={{ color: metric.color }}>
                {metric.icon}
              </div>
              <div className="impact-metric-content">
                <div className="impact-metric-value" style={{ color: metric.color }}>
                  {metric.id === 'trees' 
                    ? Math.floor(animatedValues[metric.id] || 0)
                    : (animatedValues[metric.id] || 0).toFixed(1)
                  }
                  <span className="impact-metric-unit">{metric.unit}</span>
                </div>
                <div className="impact-metric-label">{metric.label}</div>
                <div className="impact-metric-description">{metric.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {completedGoals > 0 && (
        <div className="impact-comparison">
          <h3>🌟 Equivalencias del mundo real</h3>
          <div className="comparison-grid">
            <div className="comparison-item">
              <div className="comparison-icon">🚗</div>
              <div className="comparison-text">
                <strong>{(completedGoals * 2.5 / 2.3).toFixed(1)} km</strong>
                <span>no recorridos en auto</span>
              </div>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">🚿</div>
              <div className="comparison-text">
                <strong>{Math.floor(completedGoals * 15 / 65)}</strong>
                <span>duchas ahorradas</span>
              </div>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">📱</div>
              <div className="comparison-text">
                <strong>{Math.floor(completedGoals * 0.3 * 8)}</strong>
                <span>celulares reciclados</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactPanel;