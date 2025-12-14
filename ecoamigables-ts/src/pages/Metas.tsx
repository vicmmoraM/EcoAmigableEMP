import { useState } from 'react';
import { useGoals } from '../hook/useGoals';
import { useAchievements } from '../hook/useAchievements';
import ProgressCard from '../components/metas/ProgressCard';
import GoalItem from '../components/metas/GoalItem';
import ImpactPanel from '../components/metas/ImpactPanel';
import AchievementsPanel from '../components/metas/AchievementsPanel';
import { presetGoals, type PresetGoal } from '../data/presetGoals';

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

  const completedGoals = getCompletedCount();
  
  // Calcular impacto total
  const totalImpact = {
    co2: completedGoals * 2.5,
    water: completedGoals * 15,
    trees: Math.floor(completedGoals * 0.3)
  };

  const { achievements, newUnlocks, clearNewUnlock, getStats, getLevel } = useAchievements(
    completedGoals,
    totalImpact
  );

  const [inputValue, setInputValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PresetGoal['category'] | 'todas'>('todas');
  const [showPresetGoals, setShowPresetGoals] = useState(false);

  const handleAddGoal = () => {
    if (!inputValue.trim()) return;
    
    addGoal(inputValue);
    setInputValue('');
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddPresetGoal = (presetGoal: PresetGoal) => {
    addGoal(presetGoal.text);
    setShowPresetGoals(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddGoal();
    }
  };

  const filteredPresetGoals = selectedCategory === 'todas' 
    ? presetGoals 
    : presetGoals.filter(g => g.category === selectedCategory);

  const categories = [
    { id: 'todas', label: 'Todas', color: '#5B8A72' },
    { id: 'diario', label: 'Diarias', color: '#FF9800' },
    { id: 'semanal', label: 'Semanales', color: '#2196F3' },
    { id: 'mensual', label: 'Mensuales', color: '#9C27B0' },
    { id: 'habito', label: 'Hábitos', color: '#4CAF50' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'facil': return '#4CAF50';
      case 'medio': return '#FF9800';
      case 'dificil': return '#f44336';
      default: return '#5B8A72';
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Tus Metas de Reciclaje</h1>
        <p className="subtitle">Crea hábitos sostenibles y mide tu impacto ambiental</p>
      </header>

      {/* Progreso total */}
      <ProgressCard
        progress={getProgress()}
        completedCount={completedGoals}
        totalGoals={totalGoals}
      />

      {/* Panel de Impacto Ambiental */}
      <ImpactPanel completedGoals={completedGoals} />

      {/* Panel de Logros */}
      <AchievementsPanel 
        achievements={achievements}
        stats={getStats()}
        level={getLevel()}
      />

      {/* Agregar nueva meta */}
      <div className="add-goal-section">
        <h2>Agregar Nueva Meta</h2>
        
        <div className="add-goal-buttons">
          <button 
            onClick={() => setShowPresetGoals(!showPresetGoals)}
            className="preset-goals-button"
          >
            {showPresetGoals ? 'Crear Meta Personalizada' : ' Ver Metas Sugeridas'}
          </button>
        </div>

        {showPresetGoals ? (
          <div className="preset-goals-section">
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`category-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  style={{
                    borderColor: selectedCategory === cat.id ? cat.color : '#E5E7EB',
                    background: selectedCategory === cat.id ? cat.color : 'white',
                    color: selectedCategory === cat.id ? 'white' : '#6B7280'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="preset-goals-grid">
              {filteredPresetGoals.map(goal => (
                <div key={goal.id} className="preset-goal-card">
                  <div className="preset-goal-header">
                    <span className="preset-goal-icon">{goal.icon}</span>
                    <span 
                      className="preset-goal-difficulty"
                      style={{ 
                        background: getDifficultyColor(goal.difficulty),
                        color: 'white'
                      }}
                    >
                      {goal.difficulty}
                    </span>
                  </div>
                  <h4>{goal.text}</h4>
                  <p className="preset-goal-description">{goal.description}</p>
                  <div className="preset-goal-impact">
                    <span>💨 {goal.impact.co2}kg CO₂</span>
                    <span>💧 {goal.impact.water}L</span>
                    <span>🌳 {goal.impact.trees}</span>
                  </div>
                  <button 
                    onClick={() => handleAddPresetGoal(goal)}
                    className="add-preset-button"
                  >
                    Agregar Meta
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Lista de metas */}
      <div className="goals-section">
        <h2>Mis Metas</h2>
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

      {/* Notificaciones */}
      {showNotification && (
        <div className="notification show">
          Meta agregada exitosamente
        </div>
      )}

      {newUnlocks.map(achievement => (
        <div key={achievement.id} className="achievement-notification show">
          <div className="achievement-notification-content">
            <div className="achievement-notification-icon">🏆</div>
            <div>
              <strong>¡Logro Desbloqueado!</strong>
              <p>{achievement.title}</p>
            </div>
            <button onClick={() => clearNewUnlock(achievement.id)}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metas;