/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import Thought from "./Thought"
import IntroTitle from "./IntroTitle"
import { SceneType } from "@/data/timeline"

type SceneProps = {
  scene: SceneType
  index: number
  mode: "enter" | "exit"
}

export default function Scene({ scene, mode, index }: SceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    if (mode === "enter") {
      const isFirstMemory = scene.id !== "intro" && index === 1

      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          scale: isFirstMemory ? 1.02 : 1.04,
        },
        {
          opacity: 1,
          scale: 1,
          duration: isFirstMemory ? 0.6 : 0.35,
          ease: "power3.out",
        }
      )
    }

    if (mode === "exit") {
      gsap.to(sectionRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.35,
        ease: "power3.in",
      })
    }
  }, [scene.id, mode, index])

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none"
    >
      {/* IMAGE */}
      <img
        src={scene.image}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full scene-image"
      />

      {/* INTRO OVERLAY */}
      {scene.id === "intro" && (
        <div className="absolute inset-0 bg-black/30" />
      )}

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {scene.id === "intro" ? (
          <IntroTitle />
        ) : scene.thought ? (
          <Thought
            text={scene.thought}
            delay={scene.thoughtDelay}
            x={scene.thoughtX}
            y={scene.thoughtY}
            width={scene.thoughtWidth}
            padding={scene.thoughtPadding}
            align={scene.thoughtAlign}
            rotate={scene.thoughtRotate}
          />
        ) : null}
      </div>
    </section>
  )
}
