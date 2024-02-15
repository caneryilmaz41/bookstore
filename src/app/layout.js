import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from "@/app/layout/TopBar";


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
   
<html lang="en">
      
      
      <body className={inter.className}>
      <TopBar />
      {children}
      </body>
      </html>
   
      
  )
}
