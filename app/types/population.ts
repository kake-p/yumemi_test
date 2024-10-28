export type PopuValues = {
  year: number
  value: number
}

export type PopuLabels = {
  label: string
  data: PopuValues[]
}

export type Population = {
  boundaryYear: number
  data: PopuLabels[]
}
