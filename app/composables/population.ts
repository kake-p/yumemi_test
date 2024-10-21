import type { PopuResponse } from '~/types/apiResponse'

export const useFetchPopulations = (prefCode: number) => {
  const data = $fetch<PopuResponse>(`/api/population?prefCode=${prefCode}&cityCode=-`)
  return data
}
