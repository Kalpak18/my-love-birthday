"use client"

import { useState, useEffect, useRef } from "react"
import Scene from "./Scene"
import { timeline } from "@/data/timeline"

export default function SceneEngine() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  // shared lock
  const gestureLocked = useRef(false)

  // wheel gesture (desktop)
  const wheelDelta = useRef(0)
  const wheelStopTimer = useRef<number | null>(null)

  // touch gesture (mobile)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const INTENT_THRESHOLD = 18
  const TOUCH_THRESHOLD = 50 // px swipe

  useEffect(() => {
    const unlock = () => {
      gestureLocked.current = false
      wheelDelta.current = 0
    }

    // --------------------
    // DESKTOP (WHEEL)
    // --------------------
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (gestureLocked.current) return

      wheelDelta.current += e.deltaY

      if (Math.abs(wheelDelta.current) < INTENT_THRESHOLD) return

      gestureLocked.current = true
      const direction = wheelDelta.current > 0 ? 1 : -1
      const target = index + direction

      if (target >= 0 && target < timeline.length) {
        setPrevIndex(index)
        setIndex(target)
      }

      wheelStopTimer.current = window.setTimeout(unlock, 60)
    }

    // --------------------
    // MOBILE (TOUCH)
    // --------------------
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.touches[0].clientY
    }

    const onTouchEnd = () => {
      if (gestureLocked.current) return

      const deltaY = touchStartY.current - touchEndY.current

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return

      gestureLocked.current = true
      const direction = deltaY > 0 ? 1 : -1
      const target = index + direction

      if (target >= 0 && target < timeline.length) {
        setPrevIndex(index)
        setIndex(target)
      }

      setTimeout(unlock, 80)
    }

    // listeners
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      if (wheelStopTimer.current) clearTimeout(wheelStopTimer.current)
    }
  }, [index])

  return (
    <main className="relative overflow-hidden touch-none">
      {prevIndex !== null && (
        <Scene
          key={timeline[prevIndex].id + "-prev"}
          scene={timeline[prevIndex]}
          index={prevIndex}
          mode="exit"
        />
      )}

      <Scene
        key={timeline[index].id}
        scene={timeline[index]}
        index={index}
        mode="enter"
      />
    </main>
  )
}
