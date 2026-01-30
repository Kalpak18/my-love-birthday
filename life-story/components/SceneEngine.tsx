"use client"

import { timeline } from "@/data/timeline"
import Scene from "./Scene"

export default function SceneEngine() {
  return (
    <main>
      {timeline.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} />
      ))}
    </main>
  )
}

