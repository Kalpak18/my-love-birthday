"use client"

import { useState, useEffect, useRef } from "react"
import Scene from "./Scene"
import { timeline } from "@/data/timeline"

export default function SceneEngine() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  // Gesture state
  const gestureActive = useRef(false)
  const accumulatedDelta = useRef(0)
  const wheelStopTimer = useRef<number | null>(null)

  const INTENT_THRESHOLD = 18 // fast & sensitive

  useEffect(() => {
    const unlockGesture = () => {
      gestureActive.current = false
      accumulatedDelta.current = 0
      setPrevIndex(null)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Accumulate delta during gesture
      accumulatedDelta.current += e.deltaY

      // Reset wheel-stop detector
      if (wheelStopTimer.current) {
        clearTimeout(wheelStopTimer.current)
      }

      // Detect gesture end (no wheel events)
      wheelStopTimer.current = window.setTimeout(unlockGesture, 60)

      // If already triggered slide change, do NOTHING
      if (gestureActive.current) return

      // Wait until intent is clear
      if (Math.abs(accumulatedDelta.current) < INTENT_THRESHOLD) return

      // 🔥 Trigger slide change ONCE
      gestureActive.current = true

      const direction = accumulatedDelta.current > 0 ? 1 : -1
      const targetIndex = index + direction

      if (targetIndex >= 0 && targetIndex < timeline.length) {
        setPrevIndex(index)
        setIndex(targetIndex)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
      if (wheelStopTimer.current) clearTimeout(wheelStopTimer.current)
    }
  }, [index])

  return (
    <main className="relative overflow-hidden">
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
