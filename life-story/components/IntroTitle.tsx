"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function IntroTitle() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) return

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 2.2,
        ease: "power2.out",
      }
    )
  }, [])

  return (
    <div
      ref={titleRef}
      className="text-center pointer-events-none"
    >
      <h1 className="text-[1.8rem] tracking-wide mb-2">
        Still, Becoming
      </h1>
      <p className="text-[0.85rem] opacity-80 tracking-widest">
        a life unfolding
      </p>
    </div>
  )
}
