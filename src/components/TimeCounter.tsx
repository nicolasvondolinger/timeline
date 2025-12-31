'use client'
import { useState, useEffect } from 'react'

export default function TimeCounter() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const startDate = new Date('2022-05-01T00:00:00')

    const timer = setInterval(() => {
      const now = new Date()

      let years = now.getFullYear() - startDate.getFullYear()
      let months = now.getMonth() - startDate.getMonth()
      let days = now.getDate() - startDate.getDate()

      if (days < 0) {
        months--
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += lastMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      const hours = now.getHours() - startDate.getHours()
      const minutes = now.getMinutes() - startDate.getMinutes()
      const seconds = now.getSeconds() - startDate.getSeconds()

      setTime(
        `${years} Anos, ${months} Meses, ${days} Dias, ${hours} Horas, ${minutes} Minutos, ${seconds} Segundos`
      )
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