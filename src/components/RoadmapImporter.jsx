import { useState } from 'react'
import './RoadmapImporter.css'
import Modal from './Modal'

function RoadmapImporter({ onImport }) {
  const [importing, setImporting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [importResult, setImportResult] = useState(null)

  // Пример данных для импорта (в реальном приложении это будет API)
  const exampleRoadmap = {
    technologies: [
      {
        title: 'Vue.js',
        description: 'Прогрессивный JavaScript-фреймворк',
        category: 'frontend',
        difficulty: 'beginner',
        resources: ['https://vuejs.org']
      },
      {
        title: 'Angular',
        description: 'Платформа для разработки мобильных и веб-приложений',
        category: 'frontend',
        difficulty: 'intermediate',
        resources: ['https://angular.io']
      },
      {
        title: 'Docker',
        description: 'Платформа для контейнеризации приложений',
        category: 'devops',
        difficulty: 'intermediate',
        resources: ['https://www.docker.com']
      },
      {
        title: 'Kubernetes',
        description: 'Система оркестрации контейнеров',
        category: 'devops',
        difficulty: 'advanced',
        resources: ['https://kubernetes.io']
      }
    ]
  }

  const handleImportRoadmap = async (roadmapData) => {
    try {
      setImporting(true)
      setShowModal(false)
      
      // Имитация загрузки дорожной карты из API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let importedCount = 0
      const errors = []
      
      // Добавляем каждую технологию из дорожной карты
      for (const tech of roadmapData.technologies) {
        try {
          await onImport(tech)
          importedCount++
        } catch (err) {
          errors.push(tech.title)
        }
      }
      
      setImportResult({
        success: true,
        count: importedCount,
        errors: errors.length > 0 ? errors : null
      })
      setShowModal(true)
    } catch (err) {
      setImportResult({
        success: false,
        error: err.message || 'Не удалось импортировать дорожную карту'
      })
      setShowModal(true)
    } finally {
      setImporting(false)
    }
  }

  const handleExampleImport = () => {
    handleImportRoadmap(exampleRoadmap)
  }

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <div className="import-actions">
        <button
          onClick={handleExampleImport}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : '📥 Импорт пример дорожной карты'}
        </button>
      </div>
      
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={importResult?.success ? 'Импорт завершен' : 'Ошибка импорта'}
      >
        {importResult?.success ? (
          <div className="import-success">
            <p>✅ Успешно импортировано технологий: {importResult.count}</p>
            {importResult.errors && (
              <p className="import-errors">
                Не удалось импортировать: {importResult.errors.join(', ')}
              </p>
            )}
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div className="import-error">
            <p>❌ {importResult?.error || 'Произошла ошибка при импорте'}</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Закрыть
            </button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default RoadmapImporter

