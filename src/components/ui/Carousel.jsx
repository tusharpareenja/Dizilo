'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

const Carousel = ({ items, interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [items.length, interval])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden mb-5 font-Custom2">
  {items.map((item, index) => (
    <div
      key={index}
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
        index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <img
        src={item.image}
        alt={`Slide ${index + 1}`}
        className="w-full h-full  object-cover"
      />
      <div className="absolute bottom-32 font-Custom2 left-8 text-white text-4xl font-bold">
        {item.text}
        <div>
          <Button className="mt-4 bg-white text-black hover:bg-gray-700 transition duration-300 ease-in-out">
            <span className="text-black text-xl">EXPLORE</span>
          </Button>
        </div>
      </div>
    </div>
  ))}

  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
    onClick={goToPrevious}
  >
    <ChevronLeft className="h-4 w-4" />
  </button>

  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
    onClick={goToNext}
  >
    <ChevronRight className="h-4 w-4" />
  </button>

  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {items.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full ${
          index === currentIndex ? 'bg-white' : 'bg-white/50'
        }`}
        onClick={() => goToSlide(index)}
      />
    ))}
  </div>
</div>

  )
}

export default Carousel
