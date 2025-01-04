import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/Navigation'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChromaCanvas',
  description: 'Create and explore beautiful color palettes',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <main className="flex-grow container mx-auto py-8 px-4">
              {children}
            </main>
            <footer className="border-t py-4 mt-8">
              <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-600">
                  For any queries or issues regarding the app, please contact:
                  <a href="mailto:admin@chromacanvas.com" className="text-blue-600 hover:underline ml-1">
                    nihithpenumuchu07@gmail.com
                  </a>
                </p>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

