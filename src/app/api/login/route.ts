import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { senha } = await req.json()

  const match = await bcrypt.compare(senha, 'senha123') // ou use process.env.HASHED_PASSWORD + compareSync
  if (match) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('auth-token', process.env.HASHED_PASSWORD!, {
      httpOnly: true,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
