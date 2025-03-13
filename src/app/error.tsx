'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">Algo deu errado!</h2>
      <p className="text-gray-600 mb-4">
        {error.message || 'Ocorreu um erro inesperado'}
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Tentar novamente
      </button>
    </div>
  )
} 