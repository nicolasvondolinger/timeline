'use client'
import { useState, useEffect } from 'react'

export default function UploadTimeline() {
  const [images, setImages] = useState<{ year: number; url: string }[]>([])

  useEffect(() => {
    fetch('/api/images').then(res => res.json()).then(setImages)
  }, [])

  const handleUpload = async (year: number) => {
    const file = await getFile()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('year', String(year))

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const newImage = await res.json()
    setImages((prev) => [...prev, newImage])
  }

  const getFile = () => {
    return new Promise<File | null>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = () => resolve(input.files?.[0] || null)
      input.click()
    })
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, i) => 2022 + i)

  return (
    <div className="mt-10 space-y-4">
      {years.map(year => (
        <div key={year} className="flex items-center space-x-4">
          <button onClick={() => handleUpload(year)} className="bg-gray-700 p-2 rounded-full">+</button>
          <span>{year}</span>
          {images.filter(img => img.year === year).map(img => (
            <img key={img.url} src={img.url} className="h-24" />
          ))}
        </div>
      ))}
      <div className="opacity-50 flex items-center space-x-2">
        <button onClick={() => handleUpload(currentYear + 1)} className="bg-gray-700 p-2 rounded-full">+</button>
        <span>{currentYear + 1}</span>
      </div>
    </div>
  )
}
