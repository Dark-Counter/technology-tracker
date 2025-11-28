import { useState, useEffect } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import FilterTabs from './components/FilterTabs'
import SearchBox from './components/SearchBox'

function App() {
  // Начальные данные с полем notes
  const initialTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' },
    { id: 4, title: 'Hooks', description: 'Изучение хуков React', status: 'not-started', notes: '' },
    { id: 5, title: 'Event Handling', description: 'Обработка событий в React', status: 'not-started', notes: '' }
  ]

  const [technologies, setTechnologies] = useState(initialTechnologies)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Загружаем данные из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData')
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        setTechnologies(parsedData)
        console.log('Данные загружены из localStorage')
      } catch (error) {
        console.error('Ошибка при загрузке данных из localStorage:', error)
      }
    }
  }, [])

  // Сохраняем технологии в localStorage при любом изменении
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies))
    console.log('Данные сохранены в localStorage')
  }, [technologies])

  // Функция для изменения статуса технологии
  const handleStatusChange = (id) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => {
        if (tech.id === id) {
          // Циклическое переключение: not-started → in-progress → completed → not-started
          const statusOrder = ['not-started', 'in-progress', 'completed']
          const currentIndex = statusOrder.indexOf(tech.status)
          const nextIndex = (currentIndex + 1) % statusOrder.length
          return { ...tech, status: statusOrder[nextIndex] }
        }
        return tech
      })
    )
  }

  // Функция для обновления заметок технологии
  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    )
  }

  // Функция для отметки всех как выполненных
  const markAllCompleted = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  // Функция для случайного выбора следующей технологии
  const randomNextTechnology = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started')
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты!')
      return
    }
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)]
    handleStatusChange(randomTech.id)
  }

  // Фильтрация технологий по статусу и поисковому запросу
  const filteredTechnologies = technologies.filter(tech => {
    // Фильтр по статусу
    const matchesFilter = activeFilter === 'all' || tech.status === activeFilter
    
    // Фильтр по поисковому запросу
    const matchesSearch = searchQuery === '' || 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.notes.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  return (
    <div className="app-container">
      <ProgressHeader technologies={technologies} />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onRandomNext={randomNextTechnology}
      />
      <SearchBox 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        resultsCount={filteredTechnologies.length}
      />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="technologies-list">
        {filteredTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            notes={tech.notes}
            onStatusChange={handleStatusChange}
            onNotesChange={updateTechnologyNotes}
          />
        ))}
      </div>
    </div>
  )
}

export default App
