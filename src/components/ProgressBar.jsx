import './ProgressBar.css'

function ProgressBar({ 
  progress, 
  label, 
  color = '#4CAF50', 
  animated = false, 
  height = 20,
  showPercentage = true 
}) {
  // Ограничиваем прогресс от 0 до 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="progress-bar-container">
      {label && <div className="progress-label">{label}</div>}
      <div 
        className="progress-bar-wrapper" 
        style={{ height: `${height}px` }}
      >
        <div 
          className={`progress-bar-fill ${animated ? 'animated' : ''}`}
          style={{ 
            width: `${clampedProgress}%`,
            backgroundColor: color
          }}
        >
          {showPercentage && (
            <span className="progress-text">
              {clampedProgress}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

