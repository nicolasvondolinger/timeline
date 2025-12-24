'use client'
import { useState, useEffect } from 'react'

export default function TimeCounter() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const startDate = new Date('2022-05-01T00:00:00')

    const timer = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      // Cálculos matemáticos de tempo
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const years = Math.floor(days / 365)
      const months = Math.floor((days % 365) / 30)
      const remainingDays = days % 30
      
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTime(`${years} Anos, ${months} Meses, ${remainingDays} Dias, ${hours} Horas, ${minutes} Minutos e ${seconds} Segundos`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Evita erro de hidratação mostrando vazio no primeiro render
  if (!time) return <div className="h-8"></div>

  return (
    <div className="text-center fade-in">
      <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Juntos há</p>
      <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-600">
        {time}
      </h1>
    </div>
  )
}