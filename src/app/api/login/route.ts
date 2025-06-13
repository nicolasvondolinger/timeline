import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { senha } = await req.json()

  const hashed = process.env.HASHED_PASSWORD
  if (!hashed) {
    return NextResponse.json({ success: false, error: 'HASHED_PASSWORD not set' }, { status: 500 })
  }

  const match = await bcrypt.compare(senha, hashed)
  if (match) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('auth-token', hashed, {
      httpOnly: true,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
