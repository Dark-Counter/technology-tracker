import './FilterTabs.css'

function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'not-started', label: 'Не начато' },
    { key: 'in-progress', label: 'В процессе' },
    { key: 'completed', label: 'Изучено' }
  ]

  return (
    <div className="filter-tabs">
      <h3 className="filter-title">Фильтр по статусу:</h3>
      <div className="tabs-container">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterTabs

