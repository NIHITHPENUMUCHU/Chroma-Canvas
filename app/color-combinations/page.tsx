"use client"

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Shuffle, Plus, HelpCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ColorScheme = {
  name: string
  colors: string[]
}

const initialColorSchemes: ColorScheme[] = [
  {
    name: 'Monochromatic',
    colors: ['#FF0000', '#CC0000', '#990000', '#660000', '#330000']
  },
  {
    name: 'Complementary',
    colors: ['#FF0000', '#00FFFF', '#CC0000', '#00CCCC', '#990000']
  },
  {
    name: 'Analogous',
    colors: ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00']
  },
  {
    name: 'Triadic',
    colors: ['#FF0000', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']
  },
  {
    name: 'Tetradic',
    colors: ['#FF0000', '#FFA500', '#00FF00', '#0000FF', '#8B00FF']
  },
  {
    name: 'Square',
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#808080']
  },
  {
    name: 'Split-Complementary',
    colors: ['#FF0000', '#00FF80', '#0080FF', '#FF8000', '#8000FF']
  }
]

function generateRandomColor(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

function generateRandomScheme(): ColorScheme {
  const randomName = `Random ${Math.floor(Math.random() * 1000)}`
  const randomColors = Array(5).fill(0).map(() => generateRandomColor())
  return { name: randomName, colors: randomColors }
}

export default function ColorCombinations() {
  const [colorSchemes, setColorSchemes] = useState<ColorScheme[]>(initialColorSchemes)
  const [activeScheme, setActiveScheme] = useState<ColorScheme>(colorSchemes[0])
  const tabsRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = useCallback((color: string) => {
    navigator.clipboard.writeText(color)
    toast.success(`Copied ${color} to clipboard`)
  }, [])

  const randomizeCurrentScheme = useCallback(() => {
    setActiveScheme(prevScheme => ({
      ...prevScheme,
      colors: prevScheme.colors.map(() => generateRandomColor())
    }))
    toast.success('Colors randomized for current scheme')
  }, [])

  const addRandomScheme = useCallback(() => {
    const newScheme = generateRandomScheme()
    setColorSchemes(prevSchemes => [...prevSchemes, newScheme])
    setActiveScheme(newScheme)
    toast.success('New random color scheme added')

    // Scroll to the newly added tab
    setTimeout(() => {
      if (tabsRef.current) {
        tabsRef.current.scrollLeft = tabsRef.current.scrollWidth
      }
    }, 0)
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Color Combinations</h1>
        <p className="text-lg mb-4">Explore harmonious color schemes and discover perfect combinations for your designs.</p>
      </motion.div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Color Schemes</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>How to use Color Combinations</DialogTitle>
                  <DialogDescription>
                    1. Browse through different color schemes using the tabs
                    2. Click on a color to copy its hex code
                    3. Use "Randomize Current" to generate new colors for the active scheme
                    4. Click "Add Random Scheme" to create a new custom color scheme
                    5. Experiment with different combinations to find the perfect palette for your project
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={randomizeCurrentScheme} variant="outline">
              <Shuffle className="w-4 h-4 mr-2" />
              Randomize Current
            </Button>
            <Button onClick={addRandomScheme} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Random Scheme
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeScheme.name} 
            onValueChange={(value) => setActiveScheme(colorSchemes.find(scheme => scheme.name === value)!)}
          >
            <TabsList ref={tabsRef} className="flex mb-4 overflow-x-auto pb-2">
              {colorSchemes.map((scheme) => (
                <TabsTrigger key={scheme.name} value={scheme.name} className="flex-shrink-0 mb-2 mr-2">
                  {scheme.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeScheme.name} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {activeScheme.colors.map((color, index) => (
                  <motion.div
                    key={`${color}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative group w-full">
                      <div
                        className="w-full aspect-square rounded-md cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(color)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <motion.span 
                      className="mt-2 text-sm font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {color}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

