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
    <main className="min-h-screen bg-[#0a0f2c] text-white flex items-center justify-center flex-col p-8">
      <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-md shadow-lg">
        <div className="grid grid-cols-4 gap-4 text-center text-2xl sm:text-4xl font-mono">
          {[
            { label: 'Anos', value: diff.y },
            { label: 'Meses', value: diff.mo },
            { label: 'Semanas', value: diff.w },
            { label: 'Dias', value: diff.d },
            { label: 'Horas', value: diff.h },
            { label: 'Minutos', value: diff.m },
            { label: 'Segundos', value: diff.s },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center flip-container">
              <div className="flip-card">
                <span className="flip-digit">{item.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-sm mt-2 text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <UploadTimeline />
      </div>
    </main>
  )
}
