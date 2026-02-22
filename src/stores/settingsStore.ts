import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'en' | 'nl'
export type Theme = 'light' | 'dark'

export const primaryColors = {
  blue: 'hsl(221.2 83.2% 53.3%)',
  green: 'hsl(142.1 76.2% 36.3%)',
  red: 'hsl(0 84.2% 60.2%)',
  purple: 'hsl(262.1 83.3% 57.8%)',
  orange: 'hsl(24.6 95% 53.1%)',
  pink: 'hsl(326.1 100% 74.4%)',
  teal: 'hsl(181 40.6% 56.5%)', // #63BCBD
  black: 'hsl(0 0% 9%)',
} as const

export type PrimaryColor = keyof typeof primaryColors

interface SettingsState {
  theme: Theme
  language: Language
  primaryColor: PrimaryColor
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  setPrimaryColor: (color: PrimaryColor) => void
  toggleTheme: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      primaryColor: 'blue',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'settings-storage',
    }
  )
)
