"use client"

import { useEffect, useRef, useState } from "react"
import Scene from "./Scene"
import { timeline } from "@/data/timeline"

export default function SceneEngine() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  // gesture state
  const gestureActive = useRef(false)
  const wheelTimeout = useRef<number | null>(null)
  const wheelAccum = useRef(0)

  // thresholds (IMPORTANT)
  const INTENT_THRESHOLD = 40 // prevents noise-trigger
  const GESTURE_END_DELAY = 180

  // touch
  const touchStartY = useRef(0)

  const changeScene = (direction: 1 | -1) => {
    const next = index + direction
    if (next < 0 || next >= timeline.length) return

    setPrevIndex(index)
    setIndex(next)
  }

  useEffect(() => {
    // --------------------
    // DESKTOP / TRACKPAD
    // --------------------
    const onWheel = (e: WheelEvent) => {
      // ignore zero / meaningless events
      if (e.deltaY === 0) return

      // accumulate to detect intent
      wheelAccum.current += e.deltaY

      if (!gestureActive.current) {
        if (Math.abs(wheelAccum.current) < INTENT_THRESHOLD) return

        // INTENT CONFIRMED
        gestureActive.current = true
        changeScene(wheelAccum.current > 0 ? 1 : -1)
      }

      // reset gesture end timer
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current)
      wheelTimeout.current = window.setTimeout(() => {
        gestureActive.current = false
        wheelAccum.current = 0
      }, GESTURE_END_DELAY)
    }

    // --------------------
    // MOBILE TOUCH
    // --------------------
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY
      const delta = touchStartY.current - endY

      if (Math.abs(delta) < 60) return // ignore tap / jitter

      changeScene(delta > 0 ? 1 : -1)
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current)
    }
  }, [index])

  return (
    <main className="relative h-screen w-screen overflow-hidden">
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
