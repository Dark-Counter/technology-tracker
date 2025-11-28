import { useState } from 'react'
import './QuickActions.css'
import Modal from './Modal'

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false)

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    }
    const dataStr = JSON.stringify(data, null, 2)
    
    // Создаем blob и скачиваем файл
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `technology-tracker-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setShowExportModal(true)
  }

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
        <button 
          className="action-btn action-btn-export"
          onClick={handleExport}
        >
          📥 Экспорт данных
        </button>
      </div>
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Данные успешно экспортированы!</p>
        <p>Файл загружен в папку загрузок вашего браузера.</p>
        <button 
          className="modal-close-btn"
          onClick={() => setShowExportModal(false)}
        >
          Закрыть
        </button>
      </Modal>
    </div>
  )
}

export default QuickActions

