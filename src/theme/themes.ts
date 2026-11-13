export type ThemeId = 'mocha' | 'daylight' | 'crimson'

export interface ThemeDef {
  id: ThemeId
  name: string
  tagline: string
  /** two colors used for the switcher preview swatch */
  swatch: [string, string]
}

export const THEMES: ThemeDef[] = [
  {
    id: 'mocha',
    name: 'Mocha',
    tagline: 'Beige & Brown',
    swatch: ['#9a6436', '#c58a52'],
  },
  {
    id: 'daylight',
    name: 'Daylight',
    tagline: 'White & Deep Blue',
    swatch: ['#2563eb', '#7c3aed'],
  },
  {
    id: 'crimson',
    name: 'Crimson Noir',
    tagline: 'Black & Red',
    swatch: ['#f43f3f', '#9f1239'],
  },
]

export const DEFAULT_THEME: ThemeId = 'mocha'
