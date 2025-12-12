import { useState } from 'react';
import { useGoals } from '../hook/useGoals';
import ProgressCard from '../components/metas/ProgressCard';
import GoalItem from '../components/metas/GoalItem';

const Metas = () => {
  const {
    goals,
    addGoal,
    toggleGoal,
    deleteGoal,
    getProgress,
    getCompletedCount,
    totalGoals
  } = useGoals();

  const [inputValue, setInputValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleAddGoal = () => {
    if (!inputValue.trim()) return;
    
    addGoal(inputValue);
    setInputValue('');
    
    // Mostrar notificación
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddGoal();
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Tus Metas de Reciclaje</h1>
        <p className="subtitle">Crea hábitos sostenibles paso a paso</p>
      </header>

      {/* Progreso total */}
      <ProgressCard
        progress={getProgress()}
        completedCount={getCompletedCount()}
        totalGoals={totalGoals}
      />

      {/* Agregar nueva meta */}
      <div className="add-goal-section">
        <h2>➕ Agregar Nueva Meta</h2>
        <div className="add-goal-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ej: Separar residuos todos los días..."
            className="goal-input"
            maxLength={100}
          />
          <button onClick={handleAddGoal} className="add-goal-button">
            Agregar Meta
          </button>
        </div>
      </div>

      {/* Lista de metas */}
      <div className="goals-section">
        <h2>📋 Mis Metas</h2>
        {goals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>No tienes metas aún</h3>
            <p>¡Comienza agregando tu primera meta de reciclaje!</p>
          </div>
        ) : (
          <div className="goals-list">
            {goals.map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onToggle={toggleGoal}
                onDelete={deleteGoal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Consejo */}
      <div className="info-box" style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#1565c0', fontSize: '1.5em', marginBottom: '10px' }}>
          💡 Consejo
        </h3>
        <p>
          Crear hábitos sostenibles toma tiempo. ¡Celebra cada pequeño logro y mantén la constancia!
          Tu esfuerzo ayuda al medio ambiente y a futuras generaciones.
        </p>
      </div>

      {/* Notificación */}
      {showNotification && (
        <div className="notification show">
          ✅ Meta agregada exitosamente
        </div>
      )}
    </div>
  );
};

export default Metas;