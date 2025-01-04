"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, Palette, Wand2, EyeIcon, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Palette,
    title: "Palette Creator",
    description: "Create stunning color palettes with ease",
    link: "/palette-creator"
  },
  {
    icon: Wand2,
    title: "Color Combinations",
    description: "Explore harmonious color schemes",
    link: "/color-combinations"
  },
  {
    icon: EyeIcon,
    title: "Accessibility Checker",
    description: "Ensure your colors meet accessibility standards",
    link: "/accessibility-checker"
  },
  {
    icon: Layers,
    title: "Gradient Generator",
    description: "Create beautiful gradients for your designs",
    link: "/gradients"
  }
]

export default function Home() {
  return (
    <div className="space-y-12">
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Welcome to ChromaCanvas
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Unleash your creativity with our powerful color tools. Dive into a world of vibrant hues, harmonious palettes, and accessible designs.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <Link href="/palette-creator">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-purple-500" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href={feature.link}>Explore</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <motion.section 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4">How to Use ChromaCanvas</h2>
        <p className="max-w-2xl mx-auto">
          Navigate through our tools using the menu above. Each page offers unique features to enhance your color workflow. 
          Explore, create, and refine your color choices with ease. Need help? Look for the instruction cards on each page.
        </p>
      </motion.section>
    </div>
  )
}

