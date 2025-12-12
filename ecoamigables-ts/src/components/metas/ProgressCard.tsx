import { useEffect, useState } from 'react';

interface ProgressCardProps {
  progress: number;
  completedCount: number;
  totalGoals: number;
}

const ProgressCard = ({ progress, completedCount, totalGoals }: ProgressCardProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="progress-card">
      <div className="progress-icon">🏆</div>
      <h2>Progreso Total</h2>
      <div className="progress-percentage">{progress}%</div>
      <p className="progress-text">
        {completedCount} de {totalGoals} metas completadas
      </p>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${animatedProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressCard;