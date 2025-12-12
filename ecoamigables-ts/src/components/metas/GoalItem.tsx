import type { Goal } from '../../hook/useGoals';

interface GoalItemProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const GoalItem = ({ goal, onToggle, onDelete }: GoalItemProps) => {
  return (
    <div className={`goal-item ${goal.completed ? 'completed' : ''}`}>
      <div className="goal-content">
        <div className="goal-icon">
          {goal.completed ? '✅' : '⭕'}
        </div>
        <p className={`goal-text ${goal.completed ? 'completed-text' : ''}`}>
          {goal.text}
        </p>
      </div>
      <div className="goal-actions">
        <button
          onClick={() => onToggle(goal.id)}
          className={`goal-button ${goal.completed ? 'uncomplete-button' : 'complete-button'}`}
        >
          {goal.completed ? 'Desmarcar' : 'Completar'}
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          className="delete-button"
          title="Eliminar meta"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default GoalItem;