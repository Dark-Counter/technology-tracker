import './QuickActions.css'

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
  return (
    <div className="quick-actions">
      <h2 className="actions-title">Быстрые действия</h2>
      <div className="actions-buttons">
        <button 
          className="action-btn action-btn-complete"
          onClick={onMarkAllCompleted}
        >
          ✓ Отметить все как выполненные
        </button>
        <button 
          className="action-btn action-btn-reset"
          onClick={onResetAll}
        >
          ↻ Сбросить все статусы
        </button>
        <button 
          className="action-btn action-btn-random"
          onClick={onRandomNext}
        >
          🎲 Случайный выбор следующей технологии
        </button>
      </div>
    </div>
  )
}

export default QuickActions

