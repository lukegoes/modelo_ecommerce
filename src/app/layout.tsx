import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./styles.css"
import Navbar from "./components/Navbar"
import { CartProvider } from "./providers/cart-provider"
import { Analytics } from "@vercel/analytics/react"
import MyChatBot from "./components/MyChatBot/MyChatBot"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Empresa Fictícia",
  description: "Distribuidora de alimentos",
  icons: [{ rel: "icon", url: "Favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <CartProvider>
          <Navbar />
          <main style={{ paddingTop: "120px" }}>{children}</main>
          <MyChatBot />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

