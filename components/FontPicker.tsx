"use client"

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'

const fonts = [
  'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 
  'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 
  'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Sans', 'Tahoma'
]

export function FontPicker({ value, onChange }: { value: string, onChange: (font: string) => void }) {
  const [selectedFont, setSelectedFont] = useState(value)

  useEffect(() => {
    onChange(selectedFont)
  }, [selectedFont, onChange])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Select value={selectedFont} onValueChange={setSelectedFont}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              <span style={{ fontFamily: font }}>{font}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}

