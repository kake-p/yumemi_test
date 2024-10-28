import type { PopuValues, Population } from './population'

export type SelectedPref = {
  [prefCode: number]: { prefName: string, isChecked: boolean }
}

export type ChartProps = {
  prefecture: string
  population: PopuValues[]
}[]

export type PopuList = {
  [prefCode: number]: Population
}
