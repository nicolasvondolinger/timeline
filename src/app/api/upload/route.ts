import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get('file') as File
  const year = Number(form.get('year'))

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(process.cwd(), 'public/uploads', filename)
  await writeFile(filepath, buffer)

  const image = await prisma.image.create({
    data: { year, url: `/uploads/${filename}` },
  })

  return NextResponse.json(image)
}
