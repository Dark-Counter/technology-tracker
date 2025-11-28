import { Link } from 'react-router-dom'
import './Page.css'
import './Home.css'

function Home() {
  return (
    <div className="page">
      <div className="home-hero">
        <h1>Добро пожаловать в Трекер технологий!</h1>
        <p className="hero-subtitle">
          Отслеживайте свой прогресс в изучении технологий разработки
        </p>
        <div className="hero-actions">
          <Link to="/technologies" className="btn btn-primary">
            Посмотреть все технологии
          </Link>
          <Link to="/add-technology" className="btn btn-secondary">
            Добавить технологию
          </Link>
        </div>
      </div>
      
      <div className="features">
        <h2>Наши возможности:</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 Отслеживание прогресса</h3>
            <p>Отмечайте статус изучения каждой технологии</p>
          </div>
          <div className="feature-card">
            <h3>📝 Заметки</h3>
            <p>Сохраняйте важные моменты по каждой технологии</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Поиск и фильтрация</h3>
            <p>Быстро находите нужные технологии</p>
          </div>
          <div className="feature-card">
            <h3>💾 Автосохранение</h3>
            <p>Все данные сохраняются автоматически</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

