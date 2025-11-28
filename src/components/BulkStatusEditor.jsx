import { useState } from 'react'
import './BulkStatusEditor.css'

function BulkStatusEditor({ technologies, onBulkUpdate }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [newStatus, setNewStatus] = useState('not-started')
  const [selectAll, setSelectAll] = useState(false)

  // Обработчик выбора/снятия выбора технологии
  const handleToggleSelect = (techId) => {
    setSelectedIds(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId)
      } else {
        return [...prev, techId]
      }
    })
  }

  // Обработчик выбора всех
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
    } else {
      setSelectedIds(technologies.map(tech => tech.id))
    }
    setSelectAll(!selectAll)
  }

  // Обработчик применения изменений
  const handleApply = () => {
    if (selectedIds.length === 0) {
      alert('Выберите хотя бы одну технологию')
      return
    }
    
    if (window.confirm(`Изменить статус ${selectedIds.length} технологий на "${getStatusText(newStatus)}"?`)) {
      onBulkUpdate(selectedIds, newStatus)
      setSelectedIds([])
      setSelectAll(false)
    }
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
    <div className="bulk-status-editor">
      <h3>Массовое редактирование статусов</h3>
      
      <div className="bulk-controls">
        <div className="select-all-control">
          <label>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              aria-label="Выбрать все технологии"
            />
            <span>Выбрать все ({technologies.length})</span>
          </label>
        </div>
        
        <div className="status-selector">
          <label htmlFor="status-select">
            Новый статус:
          </label>
          <select
            id="status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            aria-label="Выберите новый статус для выбранных технологий"
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Изучено</option>
          </select>
        </div>
        
        <button
          onClick={handleApply}
          disabled={selectedIds.length === 0}
          className="btn btn-primary"
          aria-label={`Применить статус "${getStatusText(newStatus)}" к ${selectedIds.length} технологиям`}
        >
          Применить к выбранным ({selectedIds.length})
        </button>
      </div>

      <div className="technologies-checklist">
        {technologies.map(tech => (
          <label
            key={tech.id}
            className={`tech-checkbox-item ${selectedIds.includes(tech.id) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(tech.id)}
              onChange={() => handleToggleSelect(tech.id)}
              aria-label={`Выбрать технологию ${tech.title}`}
            />
            <span className="tech-info">
              <strong>{tech.title}</strong>
              <span className="current-status">Текущий статус: {getStatusText(tech.status)}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default BulkStatusEditor

