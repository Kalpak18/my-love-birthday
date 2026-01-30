"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function IntroTitle() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    )
  }, [])

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-[71%] -translate-x-1/2 text-center"
    >
      <h1 className="text-[2.1rem] font-medium tracking-wide text-[#fffaf2] mb-2">
        Still, Becoming
      </h1>
      <p className="text-[0.85rem] tracking-[0.3em] uppercase text-[#f1ebdd]">
        a life unfolding
      </p>
    </div>
  )
}
