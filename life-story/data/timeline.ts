export type SceneType = {
  id: string
  image: string
  thought: string

  /* OPTIONAL ART DIRECTION */
  crop?: "crop-top" | "crop-center" | "crop-bottom" | "crop-left" | "crop-right"

  /* THOUGHT POSITION CONTROLS */
  thoughtX?: string
  thoughtY?: string
  thoughtWidth?: string
}

export const timeline: SceneType[] = [
  {
    id: "intro",
    image: "/scenes/intro.png",
    thought: "",
  },
  {
    id: "same-building",
    image: "/scenes/same-building.png",
    thought: "Everything important started very close to home.",
    crop: "crop-center",
    thoughtX: "50%",
    thoughtY: "72%",
    thoughtWidth: "80%",
  },
  {
    id: "family-trips",
    image: "/scenes/family-trips.webp",
    thought: "I didn’t know these moments were building me.",
    crop: "crop-bottom",
    thoughtX: "50%",
    thoughtY: "70%",
    thoughtWidth: "75%",
  },
  {
    id: "today",
    image: "/scenes/today.webp",
    thought: "I’m still walking.",
    crop: "crop-center",
    thoughtX: "center",
    thoughtY: "68%",
    thoughtWidth: "70%",
  },
]
