import { useState, useRef, useEffect } from 'react'
import './loading.css'

function Loading() {
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }
  }, [])

  const handleVideoEnd = () => {
    setIsFading(true)
  }

  return (
    <div className={`loading-overlay ${isFading ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="loading-video"
        src="/CYNET.mp4"
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  )
}

export default Loading
