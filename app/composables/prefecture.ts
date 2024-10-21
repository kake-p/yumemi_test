import type { PrefResponse } from '~/types/apiResponse'

export const useFetchPrefectures = () => {
  const { data, status } = useFetch<PrefResponse>('/api/prefecture')
  return { prefectures: data, status }
}
