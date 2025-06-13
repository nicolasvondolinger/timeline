'use client'

import { useEffect, useState, useRef } from 'react'
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

// Componente para cada dígito do flip counter com animação
function FlipDigit({ value, label }: { value: number; label: string }) {
  const [currentValue, setCurrentValue] = useState(value)
  const [previousValue, setPreviousValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value !== currentValue) {
      setPreviousValue(currentValue)
      setCurrentValue(value)
      setIsFlipping(true)
      
      // Reset animation after it completes
      const timeout = setTimeout(() => {
        setIsFlipping(false)
      }, 600)
      
      return () => clearTimeout(timeout)
    }
  }, [value, currentValue])

  return (
    <div className="flex flex-col items-center mx-1">
      <div className="relative w-16 h-20 perspective-500">
        {/* Parte superior do dígito (valor atual) */}
        <div 
          ref={topRef}
          className={`absolute top-0 w-full h-10 bg-gray-900 rounded-t-lg overflow-hidden flex items-center justify-center transition-transform duration-300 origin-bottom ${
            isFlipping ? 'rotateX-90' : ''
          }`}
          style={{
            transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: 2
          }}
        >
          <span className="text-2xl font-bold text-white">{currentValue.toString().padStart(2, '0')}</span>
        </div>
        
        {/* Parte superior do dígito (valor anterior - saindo) */}
        <div 
          className={`absolute top-0 w-full h-10 bg-gray-900 rounded-t-lg overflow-hidden flex items-center justify-center transition-transform duration-300 origin-bottom ${
            isFlipping ? '' : 'rotateX-90'
          }`}
          style={{
            transform: isFlipping ? 'rotateX(0deg)' : 'rotateX(90deg)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            zIndex: isFlipping ? 1 : 0
          }}
        >
          <span className="text-2xl font-bold text-white">{previousValue.toString().padStart(2, '0')}</span>
        </div>
        
        {/* Parte inferior do dígito (valor atual) */}
        <div 
          ref={bottomRef}
          className="absolute bottom-0 w-full h-10 bg-gray-800 rounded-b-lg overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 2
          }}
        >
          <span className="text-2xl font-bold text-white">{currentValue.toString().padStart(2, '0')}</span>
        </div>
        
        {/* Linha divisória */}
        <div className="absolute top-1/2 w-full h-1 bg-black z-10"></div>
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
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Container do contador com fundo preto translúcido e bordas arredondadas */}
        <div className="bg-black bg-opacity-50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-blue-400 border-opacity-20 shadow-lg">
          <h1 className="text-2xl text-center mb-6 text-blue-200 font-light tracking-wider">
            TEMPO DECORRIDO
          </h1>
          
          <div className="flex justify-center items-center flex-wrap gap-2 md:gap-4">
            <FlipDigit value={diff.y} label="ANOS" />
            <FlipDigit value={diff.mo} label="MESES" />
            <FlipDigit value={diff.w} label="SEMANAS" />
            <FlipDigit value={diff.d} label="DIAS" />
            <FlipDigit value={diff.h} label="HORAS" />
            <FlipDigit value={diff.m} label="MINUTOS" />
            <FlipDigit value={diff.s} label="SEGUNDOS" />
          </div>
        </div>
        
        <UploadTimeline />
      </div>

      {/* Adicionando estilos de animação */}
      <style jsx global>{`
        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        
        .perspective-500 {
          perspective: 500px;
        }
        
        .rotateX-90 {
          transform: rotateX(90deg);
        }
      `}</style>
    </main>
  )
}