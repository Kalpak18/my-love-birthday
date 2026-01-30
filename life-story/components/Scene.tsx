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
}

export default function Scene({ scene }: SceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Fade scene in/out (subtle)
  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    )
  }, [])

  // Subtle parallax (NOT on intro)
  useEffect(() => {
    if (!imageRef.current || scene.id === "intro") return

    gsap.fromTo(
      imageRef.current,
      { y: "-3%" },
      {
        y: "3%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )
  }, [scene.id])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      {/* IMAGE */}
      <img
        ref={imageRef}
        src={scene.image}
        alt=""
        draggable={false}
        className={`absolute inset-0 w-full h-full object-cover scene-image ${
          scene.crop ?? "crop-center"
        }`}
      />

      {/* OVERLAY (INTRO ONLY) */}
      {scene.id === "intro" && (
        <div className="absolute inset-0 bg-black/25" />
      )}

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full">
        {scene.id === "intro" ? (
          <IntroTitle />
        ) : (
          <Thought
            text={scene.thought}
            x={scene.thoughtX}
            y={scene.thoughtY}
            width={scene.thoughtWidth}
          />
        )}
      </div>
    </section>
  )
}
