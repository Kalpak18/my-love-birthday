"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

type ThoughtProps = {
  text: string

  // timing
  delay?: number

  // positioning
  x?: string
  y?: string

  // sizing
  width?: string
  padding?: string

  // style
  align?: "left" | "center" | "right"
  rotate?: number
}

export default function Thought({
  text,
  delay = 0.5,
  x = "50%",
  y = "70%",
  width = "70%",
  padding = "1.25rem 1.5rem",
  align = "center",
  rotate = 0,
}: ThoughtProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        delay,
      }
    )
  }, [text, delay])

  const translate =
    align === "center"
      ? "translateX(-50%)"
      : align === "right"
      ? "translateX(-100%)"
      : undefined

  return (
    <div
      ref={ref}
      className="absolute z-10"
      style={{
        left: x,
        top: y,
        width,
        transform: `${translate ?? ""} rotate(${rotate}deg)`,
      }}
    >
      {/* OUTER GOLD FRAME */}
      <div
        style={{
          padding: "4px",
          background:
            "linear-gradient(135deg, #f6e7a1, #c9a44c, #f6e7a1)",
          borderRadius: "14px 10px 16px 10px",
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.35)",
        }}
      >
        {/* INNER PAPER */}
        <div
          style={{
            padding,
            backgroundColor: "#f5edd6",
            borderRadius: "10px 8px 12px 8px",
            border: "2px solid rgba(180,150,60,0.55)",
          }}
        >
          <p
            className={`text-[0.95rem] leading-relaxed text-[#2f2b22] ${
              align === "left"
                ? "text-left"
                : align === "right"
                ? "text-right"
                : "text-center"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
