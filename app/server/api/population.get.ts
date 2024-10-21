import type { PopuResponse } from '~/types/apiResponse'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const END_POINT = `${config.public.baseURL}population/composition/perYear`
  const RESAS_API_KEY = config.public.RESAS_API_KEY
  const query = getQuery(event)
  const populations = await $fetch<PopuResponse>(`${END_POINT}?prefCode=${query.prefCode}&cityCode=-`, {
    headers: {
      'X-API-KEY': RESAS_API_KEY,
    },
  })
  return populations
})
