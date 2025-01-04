"use client"

import { useState, useEffect, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

// Extended color names mapping
const colorNames: { [key: string]: string } = {
  "#FF0000": "Red",
  "#00FF00": "Green",
  "#0000FF": "Blue",
  "#FFFF00": "Yellow",
  "#FF00FF": "Magenta",
  "#00FFFF": "Cyan",
  "#FFA500": "Orange",
  "#800080": "Purple",
  "#008000": "Dark Green",
  "#000080": "Navy Blue",
  "#FF4500": "Orange Red",
  "#8B4513": "Saddle Brown",
  "#4B0082": "Indigo",
  "#FF1493": "Deep Pink",
  "#1E90FF": "Dodger Blue",
  "#FFD700": "Gold",
  "#32CD32": "Lime Green",
  "#FF69B4": "Hot Pink",
  "#8A2BE2": "Blue Violet",
  "#00CED1": "Dark Turquoise",
  // Add more color mappings as needed
}

export default function ColorSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<[string, string][]>([])

  const allColors = useMemo(() => Object.entries(colorNames), [])

  useEffect(() => {
    const results = allColors.filter(([code, name]) => 
      name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm, allColors])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Color Search</h1>
        <p className="text-lg mb-4">Search for colors by name or hex code. Get instant results as you type.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Search Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search by color name or hex code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(([code, name]) => (
              <motion.div
                key={code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-20 h-20 rounded-md shadow-md"
                  style={{ backgroundColor: code }}
                />
                <p className="mt-2 font-semibold">{name}</p>
                <p className="text-sm text-gray-600">{code}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

