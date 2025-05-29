import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sharp Cuts Barbershop | Denton, TX",
  description: "Premium barber services in Denton, Texas. Clean cuts, premium grooming, and top-tier customer service.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
