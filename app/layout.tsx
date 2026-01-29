import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vai trò của quần chúng nhân dân và lãnh tụ trong lịch sử',
  description: 'Theo mục 3.2 – Giáo trình Triết học Mác – Lênin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
