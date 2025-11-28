import { useState } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import FilterTabs from './components/FilterTabs'

function App() {
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' },
    { id: 4, title: 'Hooks', description: 'Изучение хуков React', status: 'not-started' },
    { id: 5, title: 'Event Handling', description: 'Обработка событий в React', status: 'not-started' }
  ])

  const [activeFilter, setActiveFilter] = useState('all')

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

  // Фильтрация технологий по статусу
  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter === 'all') return true
    return tech.status === activeFilter
  })

  return (
    <div className="app-container">
      <ProgressHeader technologies={technologies} />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onRandomNext={randomNextTechnology}
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
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  )
}

export default App
