'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'

export default function Home() {
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ senha }),
    })
    if (res.ok) router.push('/private')
    else alert('Senha incorreta')
  }

  return (
    <main className="h-screen bg-black flex items-center justify-center text-white">
      <div>
        <input
          className="p-2 bg-gray-800 text-white"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite a senha"
        />
        <button onClick={handleSubmit} className="ml-2 bg-white text-black px-3 py-2">Entrar</button>
      </div>
    </main>
  )
}
