'use client'
import { useEffect, useState } from 'react'

export default function StarryBackground() {
  const [stars, setStars] = useState<Array<{ id: number; style: any }>>([])

  useEffect(() => {
    // Cria 100 estrelas com posições e tamanhos aleatórios
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3}px`,
        height: `${Math.random() * 3}px`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random(),
      },
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 bg-black -z-10 overflow-hidden">
      {/* Gradiente sutil para não ficar preto chapado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#090910] to-[#1a1a2e] opacity-80" />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={star.style}
        />
      ))}
    </div>
  )
}