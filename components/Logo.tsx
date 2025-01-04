import Link from 'next/link'
import { Paintbrush } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
      <Paintbrush className="w-8 h-8 text-purple-500 animate-pulse" />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        ChromaCanvas
      </span>
    </Link>
  )
}

