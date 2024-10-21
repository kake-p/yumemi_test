import type { Prefecture } from './prefecture'
import type { Population } from './population'

export type PrefResponse = {
  message: string | null
  result: Prefecture[]
}

export type PopuResponse = {
  message: string | null
  result: Population
}
