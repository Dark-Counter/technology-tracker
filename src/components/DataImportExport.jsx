import { useState } from 'react'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import './DataImportExport.css'

function DataImportExport() {
  const { technologies, setTechnologies } = useTechnologiesApi()
  const [status, setStatus] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  // Функция сохранения данных в localStorage
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('technologies', JSON.stringify(technologies))
      setStatus('Данные сохранены в localStorage')
      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      setStatus('Ошибка сохранения данных')
      console.error('Ошибка сохранения:', error)
    }
  }

  // Экспорт данных в JSON-файл
  const exportToJSON = () => {
    try {
      // Преобразуем данные в JSON-строку с форматированием
      const dataStr = JSON.stringify(technologies, null, 2)
      // Создаем Blob объект из строки
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      // Создаем временную ссылку для скачивания
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`
      // Программно кликаем по ссылке для начала скачивания
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      // Освобождаем память
      URL.revokeObjectURL(url)
      setStatus('Данные экспортированы в JSON')
      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      setStatus('Ошибка экспорта данных')
      console.error('Ошибка экспорта:', error)
    }
  }

  const importFromJSON = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    // Обработчик завершения чтения файла
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        // Проверка что импортированные данные - это массив
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных')
        }
        setTechnologies(imported)
        setStatus(`Импортировано ${imported.length} технологий`)
        setTimeout(() => setStatus(''), 3000)
      } catch (error) {
        setStatus('Ошибка импорта: неверный формат файла')
        console.error('Ошибка импорта:', error)
      }
    }
    // Запускаем асинхронное чтение файла как текста
    reader.readAsText(file)
    // Сбрасываем значение input для возможности повторного импорта того же файла
    event.target.value = ''
  }

  // Обработчики drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/json') {
      // Используем ту же логику чтения что и в importFromJSON
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result)
          if (Array.isArray(imported)) {
            setTechnologies(imported)
            setStatus(`Импортировано ${imported.length} технологий`)
            setTimeout(() => setStatus(''), 3000)
          } else {
            throw new Error('Неверный формат данных')
          }
        } catch (error) {
          setStatus('Ошибка импорта: неверный формат файла')
          console.error('Ошибка импорта:', error)
        }
      }
      reader.readAsText(file)
    } else {
      setStatus('Ошибка: выберите JSON файл')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <div className="data-import-export">
      <h1>Импорт и экспорт данных</h1>
      
      {/* Статусное сообщение */}
      {status && (
        <div className={`status-message ${status.includes('Ошибка') ? 'error' : 'success'}`} role="alert" aria-live="polite">
          {status}
        </div>
      )}
      
      {/* Кнопки управления */}
      <div className="controls">
        <button 
          onClick={exportToJSON} 
          disabled={technologies.length === 0}
          aria-label="Экспортировать данные в JSON файл"
        >
          📥 Экспорт в JSON
        </button>
        <label className="file-input-label" aria-label="Импортировать данные из JSON файла">
          📤 Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
            aria-label="Выберите JSON файл для импорта"
          />
        </label>
        <button 
          onClick={saveToLocalStorage} 
          disabled={technologies.length === 0}
          aria-label="Сохранить данные в localStorage"
        >
          💾 Сохранить в localStorage
        </button>
        <button 
          onClick={() => {
            const saved = localStorage.getItem('technologies')
            if (saved) {
              try {
                const parsed = JSON.parse(saved)
                setTechnologies(parsed)
                setStatus('Данные загружены из localStorage')
                setTimeout(() => setStatus(''), 3000)
              } catch (error) {
                setStatus('Ошибка загрузки из localStorage')
              }
            } else {
              setStatus('Нет сохраненных данных в localStorage')
              setTimeout(() => setStatus(''), 3000)
            }
          }}
          aria-label="Загрузить данные из localStorage"
        >
          📂 Загрузить из localStorage
        </button>
      </div>
      
      {/* Область drag-and-drop */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Область для перетаскивания JSON файлов"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            document.querySelector('input[type="file"]')?.click()
          }
        }}
      >
        <p>Перетащите JSON-файл сюда</p>
        <p className="drop-hint">или нажмите для выбора файла</p>
      </div>
      
      {/* Список импортированных технологий */}
      {technologies.length > 0 && (
        <div className="technologies-list">
          <h2>Технологии ({technologies.length})</h2>
          <ul>
            {technologies.slice(0, 10).map((tech, index) => (
              <li key={tech.id || index}>
                <strong>{tech.title || 'Без названия'}</strong> - {tech.category || 'Не указана'}
              </li>
            ))}
            {technologies.length > 10 && (
              <li className="more-items">... и еще {technologies.length - 10} технологий</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DataImportExport

