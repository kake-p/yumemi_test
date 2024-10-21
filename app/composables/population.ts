import type { PopuResponse } from '~/types/apiResponse'

export const useFetchPopulations = (prefCode: number) => {
  const { data, status } = useFetch<PopuResponse>(`/api/population?prefCode=${prefCode}&cityCode=-`)
  return { populations: data, status }
}
