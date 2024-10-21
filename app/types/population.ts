export type PopuValues = {
  year: number
  value: number
}

export type PopuLavels = {
  label: string
  data: PopuValues[]
}

export type Population = {
  boundaryYear: number
  data: PopuLavels[]
}
