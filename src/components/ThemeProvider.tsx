import { useEffect } from 'react'
import { useSettingsStore, primaryColors } from '@/stores/settingsStore'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, primaryColor } = useSettingsStore()

  useEffect(() => {
    // Apply dark mode class to html element
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    // Apply primary color to CSS custom property
    const root = document.documentElement
    const color = primaryColors[primaryColor]

    // Convert HSL string to HSL values for CSS variable
    // Format: "hsl(221.2 83.2% 53.3%)" -> "221.2 83.2% 53.3%"
    const hslValue = color.replace('hsl(', '').replace(')', '')
    root.style.setProperty('--primary', hslValue)
    root.style.setProperty('--ring', hslValue)
  }, [primaryColor])

  return <>{children}</>
}
