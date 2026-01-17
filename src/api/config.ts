// 개발 환경에서는 프록시를 통해 요청 (CORS 우회)
// 프로덕션에서는 환경 변수 또는 기본 URL 사용
const isDevelopment = import.meta.env.DEV
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isDevelopment ? '' : 'https://adsp-api.livbee.co.kr')

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const getApiUrl = (path: string): string => {
  // 개발 환경: 프록시 사용 (상대 경로)
  // 프로덕션: 절대 URL 사용
  if (isDevelopment && !API_BASE_URL) {
    const apiPath = path.startsWith('/') ? path : `/${path}`
    return apiPath
  }
  const baseUrl = apiConfig.baseURL.replace(/\/$/, '')
  const apiPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${apiPath}`
}
