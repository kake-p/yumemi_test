type popuValues = {
  year: number
  value: number
}

type popuLavels = {
  label: string
  data: popuValues[]
}

export type Population = {
  boundaryYear: number
  data: popuLavels[]
}
