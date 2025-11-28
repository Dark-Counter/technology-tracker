import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useTechnologies from '../hooks/useTechnologies'
import './Page.css'
import './TechnologyDetail.css'

function TechnologyDetail() {
  const { techId } = useParams()
  const navigate = useNavigate()
  const { technologies, updateStatus, setTechnologies } = useTechnologies()
  const [technology, setTechnology] = useState(null)

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId))
    setTechnology(tech)
  }, [techId, technologies])

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(techId), newStatus)
    setTechnology({ ...technology, status: newStatus })
  }

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      setTechnologies(prev => prev.filter(t => t.id !== parseInt(techId)))
      navigate('/technologies')
    }
  }

  if (!technology) {
    return (
      <div className="page">
        <div className="error-state">
          <h1>Технология не найдена</h1>
          <p>Технология с ID {techId} не существует.</p>
          <Link to="/technologies" className="btn btn-primary">
            ← Назад к списку
          </Link>
        </div>
      </div>
    )
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Изучено'
      case 'in-progress':
        return 'В процессе'
      case 'not-started':
        return 'Не начато'
      default:
        return status
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>
      
      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>
        
        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => handleStatusChange('not-started')}
              className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
            >
              Не начато
            </button>
            <button
              onClick={() => handleStatusChange('in-progress')}
              className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
            >
              В процессе
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
            >
              Завершено
            </button>
          </div>
          <p className="current-status">
            Текущий статус: <strong>{getStatusText(technology.status)}</strong>
          </p>
        </div>
        
        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <p className="notes-content">{technology.notes}</p>
          </div>
        )}
        
        {technology.category && (
          <div className="detail-section">
            <h3>Категория</h3>
            <span className="category-badge">{technology.category}</span>
          </div>
        )}
        
        <div className="detail-actions">
          <button onClick={handleDelete} className="btn btn-danger">
            Удалить технологию
          </button>
        </div>
      </div>
    </div>
  )
}

export default TechnologyDetail

