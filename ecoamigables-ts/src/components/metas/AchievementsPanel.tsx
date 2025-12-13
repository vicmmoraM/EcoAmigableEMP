import { type Achievement } from '../../hook/useAchievements';

interface AchievementsPanelProps {
  achievements: Achievement[];
  stats: { unlockedCount: number; totalCount: number; percentage: number };
  level: { level: number; title: string; nextAt: number };
}

// Componente de ícono SVG
const AchievementIcon = ({ type, unlocked }: { type: string; unlocked: boolean }) => {
  const opacity = unlocked ? 1 : 0.3;
  
  const icons = {
    leaf: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="currentColor"/>
      </svg>
    ),
    tree: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M12 2L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    trophy: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M6 9H4.5C3.67 9 3 9.67 3 10.5V12.5C3 13.33 3.67 14 4.5 14H6M18 9H19.5C20.33 9 21 9.67 21 10.5V12.5C21 13.33 20.33 14 19.5 14H18M6 9V7C6 5.89543 6.89543 5 8 5H16C17.1046 5 18 5.89543 18 7V9M6 9V15C6 16.1046 6.89543 17 8 17H16C17.1046 17 18 16.1046 18 15V9M12 17V19M12 19H9M12 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    fire: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M12 2C12 2 8 6 8 11C8 13.7614 10.2386 16 13 16C15.7614 16 18 13.7614 18 11C18 6 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16C12 16 9 18 9 20.5C9 21.8807 10.1193 23 11.5 23C12.8807 23 14 21.8807 14 20.5C14 18 12 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    star: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
      </svg>
    ),
    water: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M12 2.69L17.66 8.35C18.78 9.47 19.34 10.72 19.34 12C19.34 13.28 18.78 14.53 17.66 15.65C16.54 16.77 15.28 17.34 14 17.34C12.72 17.34 11.47 16.77 10.35 15.65C9.23 14.53 8.66 13.28 8.66 12C8.66 10.72 9.23 9.47 10.35 8.35L12 2.69Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    air: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    shield: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  return icons[type as keyof typeof icons] || icons.leaf;
};

const AchievementsPanel = ({ achievements, stats, level }: AchievementsPanelProps) => {
  const categories = [
    { id: 'goals', label: 'Metas', color: '#4CAF50' },
    { id: 'impact', label: 'Impacto', color: '#2196F3' },
    { id: 'streak', label: 'Racha', color: '#FF5722' },
    { id: 'special', label: 'Especiales', color: '#9C27B0' }
  ];

  return (
    <div className="achievements-panel">
      {/* Header con nivel */}
      <div className="achievements-header">
        <div className="level-badge">
          <div className="level-number">Nivel {level.level}</div>
          <div className="level-title">{level.title}</div>
        </div>
        <div className="achievements-stats">
          <div className="stat-circle">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8"/>
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                fill="none" 
                stroke="#4CAF50" 
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - stats.percentage / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2e7d32">
                {stats.percentage}%
              </text>
              <text x="60" y="75" textAnchor="middle" fontSize="12" fill="#6B7280">
                {stats.unlockedCount}/{stats.totalCount}
              </text>
            </svg>
          </div>
          <div className="stats-text">
            <h3>Logros Desbloqueados</h3>
            <p>{stats.unlockedCount} de {stats.totalCount} logros completados</p>
          </div>
        </div>
      </div>

      {/* Grid de logros por categoría */}
      <div className="achievements-grid">
        {categories.map(category => {
          const categoryAchievements = achievements.filter(a => a.category === category.id);
          
          return (
            <div key={category.id} className="achievement-category">
              <h3 className="category-title" style={{ color: category.color }}>
                {category.label}
              </h3>
              <div className="achievements-list">
                {categoryAchievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                  >
                    <div 
                      className="achievement-icon" 
                      style={{ color: achievement.unlocked ? achievement.color : '#9CA3AF' }}
                    >
                      <AchievementIcon type={achievement.iconType} unlocked={achievement.unlocked} />
                    </div>
                    <div className="achievement-content">
                      <h4 className={achievement.unlocked ? '' : 'locked-text'}>
                        {achievement.title}
                      </h4>
                      <p className={achievement.unlocked ? '' : 'locked-text'}>
                        {achievement.description}
                      </p>
                      
                      {!achievement.unlocked && (
                        <div className="achievement-progress">
                          <div className="progress-bar-mini">
                            <div 
                              className="progress-fill-mini" 
                              style={{ 
                                width: `${(achievement.progress / achievement.requirement) * 100}%`,
                                background: achievement.color
                              }}
                            />
                          </div>
                          <span className="progress-text-mini">
                            {achievement.progress}/{achievement.requirement}
                          </span>
                        </div>
                      )}
                      
                      {achievement.unlocked && achievement.unlockedAt && (
                        <div className="unlocked-date">
                          Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPanel;