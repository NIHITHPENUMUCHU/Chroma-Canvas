"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Copy, Download, Shuffle, Share2, Undo, Redo, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FontPicker } from '@/components/FontPicker'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Color name mapping
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
  // Add more color mappings as needed
}

export default function PaletteCreator() {
  const [currentColor, setCurrentColor] = useState("#000000")
  const [palette, setPalette] = useState<string[]>([])
  const [selectedFont, setSelectedFont] = useState("Arial")
  const [history, setHistory] = useState<string[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)

  useEffect(() => {
    const savedPalette = localStorage.getItem('palette')
    if (savedPalette) {
      setPalette(JSON.parse(savedPalette))
      setHistory([JSON.parse(savedPalette)])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('palette', JSON.stringify(palette))
  }, [palette])

  const updateHistory = useCallback((newPalette: string[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newPalette)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const addColor = useCallback(() => {
    if (palette.length < 5 && !palette.includes(currentColor)) {
      const newPalette = [...palette, currentColor]
      setPalette(newPalette)
      updateHistory(newPalette)
      toast.success('Color added to palette')
    }
  }, [palette, currentColor, updateHistory])

  const removeColor = useCallback((colorToRemove: string) => {
    const newPalette = palette.filter(color => color !== colorToRemove)
    setPalette(newPalette)
    updateHistory(newPalette)
    toast.success('Color removed from palette')
  }, [palette, updateHistory])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPalette(history[historyIndex - 1])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPalette(history[historyIndex + 1])
    }
  }, [history, historyIndex])

  const copyToClipboard = useCallback(() => {
    const cssVariables = palette.map((color, index) => `--color-${index + 1}: ${color};`).join('\n')
    navigator.clipboard.writeText(cssVariables)
    toast.success('Palette copied to clipboard')
  }, [palette])

  const downloadPalette = useCallback(() => {
    const jsonContent = JSON.stringify({ palette, font: selectedFont }, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'palette.json'
    link.click()
    toast.success('Palette downloaded')
  }, [palette, selectedFont])

  const generateRandomColor = useCallback(() => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setCurrentColor(randomColor)
  }, [])

  const sharePalette = useCallback(() => {
    const paletteString = palette.join(',')
    const shareUrl = `${window.location.origin}/palette-creator?colors=${paletteString}&font=${encodeURIComponent(selectedFont)}`
    navigator.clipboard.writeText(shareUrl)
    toast.success('Shareable link copied to clipboard')
  }, [palette, selectedFont])

  const getColorName = useCallback((color: string) => {
    return colorNames[color.toUpperCase()] || "Custom Color"
  }, [])

  const previewColors = useMemo(() => {
    return palette.map((color, index) => ({
      backgroundColor: color,
      textColor: palette[(index + 2) % palette.length] || '#000000',
      name: getColorName(color)
    }))
  }, [palette, getColorName])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Palette Creator</h1>
        <p className="text-base md:text-lg mb-4">Create stunning color palettes with ease. Mix and match colors to find the perfect combination for your project.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">Color Picker</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>How to use the Palette Creator</DialogTitle>
                  <DialogDescription>
                    1. Use the color picker to select a color
                    2. Click "Add to Palette" to add the color (max 5 colors)
                    3. Click on a color in the palette to copy its hex code
                    4. Use the trash icon to remove a color
                    5. Experiment with different fonts using the font picker
                    6. Use the action buttons to copy, download, or share your palette
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center">
                <HexColorPicker color={currentColor} onChange={setCurrentColor} />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <motion.div 
                  className="w-12 h-12 rounded-md border-2 border-gray-300" 
                  style={{ backgroundColor: currentColor }}
                  animate={{ backgroundColor: currentColor }}
                />
                <span className="font-mono">{currentColor}</span>
                <span className="text-sm">{getColorName(currentColor)}</span>
                <Button onClick={addColor} disabled={palette.length >= 5 || palette.includes(currentColor)}>
                  Add to Palette
                </Button>
                <Button onClick={generateRandomColor} variant="outline">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Random
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Current Palette:</h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {palette.map((color, index) => (
                      <motion.div 
                        key={color}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div 
                          className="w-12 h-12 rounded-md cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            navigator.clipboard.writeText(color);
                            toast.success(`Copied ${color} to clipboard`);
                          }}
                        />
                        <span className="text-xs mt-1 block text-center">{getColorName(color)}</span>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeColor(color)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Select Font:</h3>
                <FontPicker value={selectedFont} onChange={setSelectedFont} />
              </div>
              <div className="flex flex-wrap justify-between space-x-2 gap-2">
                <div>
                  <Button onClick={undo} variant="outline" disabled={historyIndex === 0}>
                    <Undo className="w-4 h-4 mr-2" />
                    Undo
                  </Button>
                  <Button onClick={redo} variant="outline" disabled={historyIndex === history.length - 1} className="ml-2">
                    <Redo className="w-4 h-4 mr-2" />
                    Redo
                  </Button>
                </div>
                <div>
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button onClick={downloadPalette} variant="outline" className="ml-2">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={sharePalette} variant="outline" className="ml-2">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {previewColors.map((colors, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-md"
                  style={{ backgroundColor: colors.backgroundColor, color: colors.textColor }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: selectedFont }}>
                    {colors.name}
                  </h2>
                  <p style={{ fontFamily: selectedFont }}>
                    This is a sample text to preview the selected color and font combination.
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

