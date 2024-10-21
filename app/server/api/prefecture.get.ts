import type { PrefResponse } from '~/types/apiResponse'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const END_POINT = `${config.public.baseURL}prefectures`
  const RESAS_API_KEY = config.public.RESAS_API_KEY
  const prefectures = await $fetch<PrefResponse>(END_POINT, {
    headers: {
      'X-API-KEY': RESAS_API_KEY,
    },
  })
  return prefectures
})
