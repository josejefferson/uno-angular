import * as seedrandom from 'seedrandom'

export const COLORS = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
]

export function seedColor(seed: string) {
  const i = Math.floor(seedrandom(seed)() * COLORS.length)
  const color = COLORS[i]
  return color
}
