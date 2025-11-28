import './SearchBox.css'

function SearchBox({ searchQuery, onSearchChange, resultsCount }) {
  return (
    <div className="search-box">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
      <span className="search-results">Найдено: {resultsCount}</span>
    </div>
  )
}

export default SearchBox

