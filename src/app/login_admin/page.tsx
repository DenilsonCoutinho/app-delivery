// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (password === process.env.NEXT_PUBLIC_PASSWORD_TOKEN as string) {
      document.cookie = `authToken=${password}; path=/`
      router.replace('/Order-board')
    } else {
      alert('Senha incorreta')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">🔐 Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">Apenas para administradores autorizados.</p>
      </div>
    </div>
  )
}
