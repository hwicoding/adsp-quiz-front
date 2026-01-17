const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://adsp-api.livbee.co.kr'

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const getApiUrl = (path: string): string => {
  const baseUrl = apiConfig.baseURL.replace(/\/$/, '')
  const apiPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${apiPath}`
}
