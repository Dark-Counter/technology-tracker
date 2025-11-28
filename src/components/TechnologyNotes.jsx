import './TechnologyNotes.css'

function TechnologyNotes({ notes, onNotesChange, techId }) {
  const handleNotesChange = (e) => {
    e.stopPropagation() // Предотвращаем всплытие события клика на карточку
    onNotesChange(techId, e.target.value)
  }

  return (
    <div className="notes-section" onClick={(e) => e.stopPropagation()}>
      <h4 className="notes-title">Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        className="notes-textarea"
      />
      <div className="notes-hint">
        {notes.length > 0 
          ? `Заметка сохранена (${notes.length} символов)` 
          : 'Добавьте заметку'}
      </div>
    </div>
  )
}

export default TechnologyNotes

