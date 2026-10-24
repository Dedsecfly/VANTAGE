import './globals.css'

export const metadata = {
  title: 'VANTAGE',
  description: 'Quantitative Analysis Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg font-archivo text-ink">{children}</body>
    </html>
  )
}
