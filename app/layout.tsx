import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { PT_Serif } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const ptSerif = PT_Serif({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Manimsplain",
  description: "A chatbot that uses the Manim library to explain math concepts.",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={ptSerif.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}