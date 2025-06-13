import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const images = await prisma.image.findMany()
  return NextResponse.json(images)
}
