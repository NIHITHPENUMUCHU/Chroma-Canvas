"use client"

import { useState, useCallback, useMemo } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Download, HelpCircle, Plus, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type GradientType = 'linear' | 'radial' | 'conic'

const gradientTypes: GradientType[] = ['linear', 'radial', 'conic']

const gradientDesigns = [
  'Default',
  'Diagonal',
  'Radial Burst',
  'Conic Swirl',
  'Rainbow',
  'Sunset',
  'Ocean',
  'Forest',
  'Fire',
  'Ice',
  'Neon',
  'Pastel',
  'Metallic',
  'Earth Tones',
  'Monochromatic',
  'Complementary',
  'Triadic',
  'Split-Complementary',
  'Analogous',
  'Tetradic'
]

export default function GradientsPage() {
  const [colors, setColors] = useState<string[]>(["#ff0000", "#0000ff"])
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState(90)
  const [selectedDesign, setSelectedDesign] = useState('Default')

  const addColor = useCallback(() => {
    if (colors.length < 5) {
      setColors([...colors, "#000000"])
    }
  }, [colors])

  const removeColor = useCallback((index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }, [colors])

  const updateColor = useCallback((index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }, [colors])

  const { gradientStyle, gradientCSS } = useMemo(() => {
    const style = {
      backgroundImage: 
        gradientType === 'linear' 
          ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
          : gradientType === 'radial'
          ? `radial-gradient(circle, ${colors.join(', ')})`
          : `conic-gradient(from ${angle}deg, ${colors.join(', ')})`
    }
    const css = 
      gradientType === 'linear'
        ? `background: linear-gradient(${angle}deg, ${colors.join(', ')});`
        : gradientType === 'radial'
        ? `background: radial-gradient(circle, ${colors.join(', ')});`
        : `background: conic-gradient(from ${angle}deg, ${colors.join(', ')});`
    return { gradientStyle: style, gradientCSS: css }
  }, [colors, gradientType, angle])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(gradientCSS)
    toast.success('Gradient CSS copied to clipboard')
  }, [gradientCSS])

  const downloadGradient = useCallback(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1000
    canvas.height = 1000
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = 
        gradientType === 'linear'
          ? ctx.createLinearGradient(0, 0, 1000 * Math.cos(angle * Math.PI / 180), 1000 * Math.sin(angle * Math.PI / 180))
          : gradientType === 'radial'
          ? ctx.createRadialGradient(500, 500, 0, 500, 500, 500)
          : ctx.createConicGradient(angle * Math.PI / 180, 500, 500)
      
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color)
      })
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1000, 1000)
    }
    
    const link = document.createElement('a')
    link.download = 'gradient.png'
    link.href = canvas.toDataURL()
    link.click()
    toast.success('Gradient image downloaded')
  }, [colors, gradientType, angle])

  const applyDesign = useCallback((design: string) => {
    setSelectedDesign(design)
    switch (design) {
      case 'Rainbow':
        setColors(['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff'])
        setGradientType('linear')
        setAngle(90)
        break
      case 'Sunset':
        setColors(['#ff7e5f', '#feb47b'])
        setGradientType('linear')
        setAngle(0)
        break
      case 'Ocean':
        setColors(['#00c9ff', '#92fe9d'])
        setGradientType('linear')
        setAngle(45)
        break
      case 'Forest':
        setColors(['#11998e', '#38ef7d'])
        setGradientType('linear')
        setAngle(135)
        break
      case 'Fire':
        setColors(['#ff416c', '#ff4b2b'])
        setGradientType('radial')
        break
      case 'Ice':
        setColors(['#e0eafc', '#cfdef3'])
        setGradientType('conic')
        setAngle(0)
        break
      case 'Neon':
        setColors(['#ff00ff', '#00ffff'])
        setGradientType('linear')
        setAngle(45)
        break
      default:
        // Keep current settings for 'Default' and other designs
        break
    }
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Gradient Creator</h1>
        <p className="text-lg mb-4">Create beautiful gradients with up to 5 colors. Mix and match different types and designs for stunning effects.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Gradient Settings</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>How to use the Gradient Creator</DialogTitle>
                  <DialogDescription>
                    1. Add up to 5 colors using the color pickers
                    2. Choose between linear, radial, and conic gradient types
                    3. Adjust the angle for linear and conic gradients
                    4. Select from 20 pre-designed gradient styles
                    5. Preview your gradient in real-time
                    6. Copy the CSS code or download the gradient as an image
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Colors</Label>
                <div className="flex flex-wrap gap-4">
                  <AnimatePresence>
                    {colors.map((color, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <HexColorPicker color={color} onChange={(newColor) => updateColor(index, newColor)} />
                        <div className="flex items-center gap-2">
                          <Input
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            className="w-24"
                          />
                          {colors.length > 2 && (
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeColor(index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {colors.length < 5 && (
                  <Button onClick={addColor} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Color
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradientType">Gradient Type</Label>
                <Select value={gradientType} onValueChange={(value: GradientType) => setGradientType(value)}>
                  <SelectTrigger id="gradientType">
                    <SelectValue placeholder="Select gradient type" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(gradientType === 'linear' || gradientType === 'conic') && (
                <div className="space-y-2">
                  <Label htmlFor="angle">Angle: {angle}°</Label>
                  <Slider
                    id="angle"
                    min={0}
                    max={360}
                    step={1}
                    value={[angle]}
                    onValueChange={(value) => setAngle(value[0])}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="design">Gradient Design</Label>
                <Select value={selectedDesign} onValueChange={applyDesign}>
                  <SelectTrigger id="design">
                    <SelectValue placeholder="Select a design" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientDesigns.map((design) => (
                      <SelectItem key={design} value={design}>
                        {design}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </Button>
                <Button onClick={downloadGradient}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Gradient Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="w-full aspect-square rounded-md"
              style={gradientStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <pre className="overflow-x-auto">
                <code className="text-sm">{gradientCSS}</code>
              </pre>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

