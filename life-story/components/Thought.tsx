"use client"

type ThoughtProps = {
  text: string
  x?: string
  y?: string
  width?: string
}

export default function Thought({
  text,
  x = "50%",
  y = "72%",
  width = "80%",
}: ThoughtProps) {
  return (
    <div
      className="absolute z-10 px-4 py-3 rounded-xl"
      style={{
        left: x === "center" ? "50%" : x,
        top: y,
        width,
        transform: x === "center" ? "translateX(-50%)" : undefined,
        background: "rgba(0,0,0,0.38)",
        backdropFilter: "blur(6px)",
      }}
    >
      <p className="text-center text-[0.95rem] leading-relaxed">
        {text}
      </p>
    </div>
  )
}
