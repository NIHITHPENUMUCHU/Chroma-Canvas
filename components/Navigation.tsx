"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const routes = [
  { href: '/', label: 'Home' },
  { href: '/palette-creator', label: 'Palette Creator' },
  { href: '/color-combinations', label: 'Color Combinations' },
  { href: '/accessibility-checker', label: 'Accessibility Checker' },
  { href: '/gradients', label: 'Gradients' },
  { href: '/color-search', label: 'Color Search' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex space-x-4">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant={pathname === route.href ? 'default' : 'ghost'}
              >
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              {routes.map((route) => (
                <li key={route.href}>
                  <Button
                    asChild
                    variant={pathname === route.href ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href={route.href}>{route.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

