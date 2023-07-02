'use client'

import React from 'react'
import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react'
import { NextReactP5Wrapper } from '@p5-wrapper/next'

export default function Home () {
  return (
    <main>
      <section>
        <NextReactP5Wrapper sketch={sketch} />
      </section>
    </main>
  )
}

const sketch: Sketch = (p5: P5CanvasInstance) => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL)

  p5.draw = () => {
    p5.background([0, 0, 0, 0])
    p5.normalMaterial()
    p5.push()
    p5.rotateZ(p5.frameCount * 0.01)
    p5.rotateX(p5.frameCount * 0.01)
    p5.rotateY(p5.frameCount * 0.01)
    p5.plane(100)
    p5.pop()
  }
}
