import "./globals.css"

export const metadata = {
  title: "An Ongoing Story",
  description: "A quiet life, still unfolding.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
