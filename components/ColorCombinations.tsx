import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'

type ColorScheme = {
  name: string
  colors: string[]
}

const colorSchemes: ColorScheme[] = [
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
  }
]

export function ColorCombinations() {
  const [activeScheme, setActiveScheme] = useState<ColorScheme>(colorSchemes[0])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Combinations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={colorSchemes[0].name} onValueChange={(value) => setActiveScheme(colorSchemes.find(scheme => scheme.name === value)!)}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {colorSchemes.map((scheme) => (
              <TabsTrigger key={scheme.name} value={scheme.name}>
                {scheme.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeScheme.name} className="mt-4">
            <div className="flex justify-center space-x-2">
              {activeScheme.colors.map((color, index) => (
                <motion.div
                  key={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

