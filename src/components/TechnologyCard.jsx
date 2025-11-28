import { Link } from 'react-router-dom'
import './TechnologyCard.css'
import TechnologyNotes from './TechnologyNotes'

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const getStatusClass = () => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'in-progress':
        return 'status-in-progress'
      case 'not-started':
        return 'status-not-started'
      default:
        return ''
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'in-progress':
        return '⟳'
      case 'not-started':
        return '○'
      default:
        return ''
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено'
      case 'in-progress':
        return 'В процессе'
      case 'not-started':
        return 'Не начато'
      default:
        return ''
    }
  }

  const handleClick = () => {
    if (onStatusChange) {
      onStatusChange(id)
    }
  }

  return (
    <div 
      className={`technology-card ${getStatusClass()}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className="status-icon">{getStatusIcon()}</span>
      </div>
      <p className="card-description">{description}</p>
      <TechnologyNotes
        notes={notes || ''}
        onNotesChange={onNotesChange}
        techId={id}
      />
      <div className="card-footer">
        <span className="status-badge">{getStatusText()}</span>
        <div className="card-actions">
          <span className="click-hint">Нажмите для изменения статуса</span>
          <Link to={`/technology/${id}`} className="detail-link" onClick={(e) => e.stopPropagation()}>
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TechnologyCard

