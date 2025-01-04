"use client"

import { useState, useMemo } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FontPicker } from '@/components/FontPicker'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function calculateContrast(color1: string, color2: string) {
  const getLuminance = (color: string) => {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >>  8) & 0xff
    const b = (rgb >>  0) & 0xff
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return luminance <= 0.03928
      ? luminance / 12.92
      : Math.pow((luminance + 0.055) / 1.055, 2.4)
  }

  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  const contrast = l1 > l2
    ? (l1 + 0.05) / (l2 + 0.05)
    : (l2 + 0.05) / (l1 + 0.05)
  return contrast.toFixed(2)
}

export default function AccessibilityChecker() {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [textColor, setTextColor] = useState("#000000")
  const [sampleText, setSampleText] = useState("Sample Text")
  const [selectedFont, setSelectedFont] = useState("Arial")

  const { contrastRatio, isAALarge, isAASmall, isAAALarge, isAAASmall } = useMemo(() => {
    const ratio = calculateContrast(backgroundColor, textColor)
    return {
      contrastRatio: ratio,
      isAALarge: parseFloat(ratio) >= 3,
      isAASmall: parseFloat(ratio) >= 4.5,
      isAAALarge: parseFloat(ratio) >= 4.5,
      isAAASmall: parseFloat(ratio) >= 7
    }
  }, [backgroundColor, textColor])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Accessibility Checker</h1>
        <p className="text-lg mb-4">Ensure your color combinations meet accessibility standards for better readability and inclusivity.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Color Settings</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>How to use the Accessibility Checker</DialogTitle>
                  <DialogDescription>
                    1. Use the color pickers to select background and text colors
                    2. Enter sample text to preview
                    3. Choose a font to see how it affects readability
                    4. Check the contrast ratio and compliance results
                    5. Adjust colors as needed to meet accessibility standards
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-2">
                <Label htmlFor="background-color">Background Color</Label>
                <div className="flex items-center gap-2">
                  <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                  <Input
                    id="background-color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="text-color">Text Color</Label>
                <div className="flex items-center gap-2">
                  <HexColorPicker color={textColor} onChange={setTextColor} />
                  <Input
                    id="text-color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-text">Sample Text</Label>
                <Input
                  id="sample-text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="font-picker">Font</Label>
                <FontPicker value={selectedFont} onChange={setSelectedFont} />
              </div>
            </motion.div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview and Results</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="p-4 rounded-md"
                style={{ backgroundColor, color: textColor, fontFamily: selectedFont }}
              >
                <p className="text-2xl font-bold">{sampleText}</p>
                <p className="text-base">{sampleText}</p>
              </div>
              <div className="space-y-2">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Contrast Ratio: {contrastRatio}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  AA Compliance (Large Text): {isAALarge ? "Pass" : "Fail"}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  AA Compliance (Small Text): {isAASmall ? "Pass" : "Fail"}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  AAA Compliance (Large Text): {isAAALarge ? "Pass" : "Fail"}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  AAA Compliance (Small Text): {isAAASmall ? "Pass" : "Fail"}
                </motion.p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

