import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useTechnologies from '../hooks/useTechnologies'
import TechnologyCard from '../components/TechnologyCard'
import SearchBox from '../components/SearchBox'
import FilterTabs from '../components/FilterTabs'
import ProgressHeader from '../components/ProgressHeader'
import QuickActions from '../components/QuickActions'
import './Page.css'
import './TechnologyList.css'

function TechnologyList() {
  const { technologies, updateStatus, updateNotes, markAllCompleted, resetAll, progress } = useTechnologies()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Функция для изменения статуса технологии (циклическое переключение)
  const handleStatusChange = (id) => {
    const tech = technologies.find(t => t.id === id)
    if (tech) {
      const statusOrder = ['not-started', 'in-progress', 'completed']
      const currentIndex = statusOrder.indexOf(tech.status)
      const nextIndex = (currentIndex + 1) % statusOrder.length
      updateStatus(id, statusOrder[nextIndex])
    }
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
    const matchesFilter = activeFilter === 'all' || tech.status === activeFilter
    const matchesSearch = searchQuery === '' || 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>
      
      <ProgressHeader technologies={technologies} />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNextTechnology}
        technologies={technologies}
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
            notes={tech.notes || ''}
            onStatusChange={handleStatusChange}
            onNotesChange={updateNotes}
          />
        ))}
      </div>
      
      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  )
}

export default TechnologyList

