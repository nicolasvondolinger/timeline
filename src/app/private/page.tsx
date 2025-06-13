'use client'

import { useEffect, useState } from 'react'
import UploadTimeline from '@/components/UploadTimeline'

const START_DATE = new Date('2022-05-01T21:50:00')

type TimeDiff = {
  y: number
  mo: number
  w: number
  d: number
  h: number
  m: number
  s: number
}

// Componente para cada dígito do flip counter
function FlipDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center mx-1">
      <div className="relative w-16 h-20">
        {/* Parte superior do dígito */}
        <div className="absolute top-0 w-full h-10 bg-gray-900 rounded-t-lg overflow-hidden flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
        </div>
        {/* Parte inferior do dígito */}
        <div className="absolute bottom-0 w-full h-10 bg-gray-800 rounded-b-lg overflow-hidden flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
        </div>
        {/* Linha divisória */}
        <div className="absolute top-1/2 w-full h-1 bg-black z-10"></div>
        {/* Efeito de dobra (parte que "vira") */}
        <div className="absolute top-0 w-full h-5 bg-gray-700 opacity-30 rounded-t-lg"></div>
      </div>
      <span className="text-xs mt-2 text-gray-300">{label}</span>
    </div>
  )
}

export default function ProtectedPage() {
  const [diff, setDiff] = useState<TimeDiff>({
    y: 0,
    mo: 0,
    w: 0,
    d: 0,
    h: 0,
    m: 0,
    s: 0
  })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const ms = now.getTime() - START_DATE.getTime()
      const seconds = Math.floor(ms / 1000)

      const y = Math.floor(seconds / (365 * 24 * 60 * 60))
      const mo = Math.floor(seconds / (30 * 24 * 60 * 60)) % 12
      const w = Math.floor(seconds / (7 * 24 * 60 * 60)) % 4
      const d = Math.floor(seconds / (24 * 60 * 60)) % 7
      const h = Math.floor(seconds / (60 * 60)) % 24
      const m = Math.floor(seconds / 60) % 60
      const s = seconds % 60

      setDiff({ y, mo, w, d, h, m, s })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-blue-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Container do contador com fundo preto translúcido e bordas arredondadas */}
        <div className="bg-black bg-opacity-50 rounded-xl p-6 mb-8 backdrop-blur-sm">
          <h1 className="text-2xl text-center mb-6 text-gray-300">Tempo desde o início</h1>
          
          <div className="flex justify-center items-center flex-wrap gap-4">
            <FlipDigit value={diff.y} label="anos" />
            <FlipDigit value={diff.mo} label="meses" />
            <FlipDigit value={diff.w} label="semanas" />
            <FlipDigit value={diff.d} label="dias" />
            <FlipDigit value={diff.h} label="horas" />
            <FlipDigit value={diff.m} label="minutos" />
            <FlipDigit value={diff.s} label="segundos" />
          </div>
        </div>
        
        <UploadTimeline />
      </div>
    </main>
  )
}