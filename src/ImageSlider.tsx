import React, { useState, useEffect } from 'react'

interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
}

interface ImageSliderProps {
  slides: Slide[]
}

export default function ImageSlider({ slides }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Auto-play feature: changes slide every 3 seconds
  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  if (slides.length === 0) return null

  return (
    <div className="slider-wrapper">
      {/* Current Slide Display */}
      <div className="slider-card">
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="slider-img"
        />
        <div className="slider-overlay">
          <h2>{slides[currentIndex].title}</h2>
          <p>{slides[currentIndex].subtitle}</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="slider-arrow prev-arrow" onClick={goToPrev}>
        &#10094;
      </button>
      <button className="slider-arrow next-arrow" onClick={goToNext}>
        &#10095;
      </button>

      {/* Dot Indicators */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}