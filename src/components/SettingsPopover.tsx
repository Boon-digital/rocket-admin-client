import { Globe, Moon, Palette, Gear, Sun } from '@phosphor-icons/react'
import type { PrimaryColor } from '@/stores/settingsStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { primaryColors, useSettingsStore } from '@/stores/settingsStore'

const translations = {
  en: {
    settings: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    primaryColor: 'Primary Color',
    english: 'English',
    dutch: 'Dutch',
  },
  nl: {
    settings: 'Instellingen',
    darkMode: 'Donkere Modus',
    language: 'Taal',
    primaryColor: 'Primaire Kleur',
    english: 'Engels',
    dutch: 'Nederlands',
  },
}

const colorNames = {
  blue: { en: 'Blue', nl: 'Blauw' },
  green: { en: 'Green', nl: 'Groen' },
  red: { en: 'Red', nl: 'Rood' },
  purple: { en: 'Purple', nl: 'Paars' },
  orange: { en: 'Orange', nl: 'Oranje' },
  pink: { en: 'Pink', nl: 'Roze' },
  teal: { en: 'Teal', nl: 'Blauwgroen' },
  black: { en: 'Black', nl: 'Zwart' },
}

interface SettingsPopoverProps {
  isCollapsed?: boolean
}

export default function SettingsPopover({ isCollapsed }: SettingsPopoverProps) {
  const { theme, language, primaryColor, setTheme, setLanguage, setPrimaryColor } =
    useSettingsStore()

  const t = translations[language]

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start overflow-hidden text-nowrap"
        >
          <Gear className="h-4 w-4 shrink-0" weight="light" />
          {!isCollapsed && <span className="ml-2">{t.settings}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-popover" align="end" side="right">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t.settings}</h3>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4" weight="light" />
              ) : (
                <Sun className="h-4 w-4" weight="light" />
              )}
              <Label htmlFor="dark-mode">{t.darkMode}</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
          </div>

          {/* Language Dropdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" weight="light" />
              <Label>{t.language}</Label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {language === 'en' ? t.english : t.dutch}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  {t.english}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('nl')}>
                  {t.dutch}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Primary Color Dropdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" weight="light" />
              <Label>{t.primaryColor}</Label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <div
                    className="h-4 w-4 rounded-sm"
                    style={{ backgroundColor: primaryColors[primaryColor] }}
                  />
                  {colorNames[primaryColor][language]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                {(Object.keys(primaryColors) as Array<PrimaryColor>).map((color) => (
                  <DropdownMenuItem
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    className="gap-2"
                  >
                    <div
                      className="h-4 w-4 rounded-sm"
                      style={{ backgroundColor: primaryColors[color] }}
                    />
                    {colorNames[color][language]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
