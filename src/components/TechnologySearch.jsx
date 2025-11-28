import { useState, useEffect, useRef } from 'react'
import './TechnologySearch.css'

function TechnologySearch({ onSearch, loading = false }) {
  const [searchTerm, setSearchTerm] = useState('')
  const searchTimeoutRef = useRef(null)
  const abortControllerRef = useRef(null)

  useEffect(() => {
    // Отменяем предыдущий таймер при изменении поискового запроса
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Отменяем предыдущий запрос, если он существует
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Создаем новый AbortController для текущего запроса
    abortControllerRef.current = new AbortController()

    // Устанавливаем новый таймер для debounce (500ms)
    searchTimeoutRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm, abortControllerRef.current.signal)
      }
    }, 500)

    // Очистка при размонтировании
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [searchTerm, onSearch])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
    if (onSearch) {
      onSearch('', null)
    }
  }

  return (
    <div className="technology-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={handleClear}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
        {loading && (
          <div className="search-loading">
            <div className="spinner-small"></div>
          </div>
        )}
      </div>
      {searchTerm && (
        <div className="search-info">
          Поиск: <strong>{searchTerm}</strong>
        </div>
      )}
    </div>
  )
}

export default TechnologySearch

