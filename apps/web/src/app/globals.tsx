/* src/app/globals.tsx - Institutional UI */
import React from 'react'

export const Metadata = {
  title: 'VANTAGE',
  description: 'Quantitative Analysis Platform',
}

// This component runs on the server and injects CSS variables
export default function GlobalStyles(): React.ReactNode {
  return (
    <style>{`
      :root {
        --background: hsl(0 0% 3%);
        --foreground: hsl(0 0% 98%);
        --card: hsl(0 0% 5%);
        --border: hsl(0 0% 15%);
        --muted: hsl(0 0% 25%);
        --accent: hsl(45 100% 50%);
      }

      body {
        font-family: 'Inter', sans-serif;
        background: var(--background);
        color: var(--foreground);
        margin: 0;
        min-height: 100vh;
      }

      a {
        color: var(--accent);
        text-decoration: none;
      }

      a:hover {
        color: hsl(45 100% 60%);
      }
    `}</style>
  )
}