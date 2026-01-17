import { getApiUrl } from './config'
import type { ApiError } from './types'

interface RequestOptions extends RequestInit {
  timeout?: number
}

class ApiClient {
  private async request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout = 30000, ...fetchOptions } = options
    const url = getApiUrl(path)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: response.statusText,
        }))
        throw this.createError(errorData, response.status)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw this.createError({ message: '요청 시간이 초과되었습니다.' }, 408)
        }
        throw this.createError({ message: error.message }, 0)
      }
      throw error
    }
  }

  private createError(data: unknown, status: number): ApiError {
    const error = data as { message?: string; code?: string; details?: unknown }
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      code: error.code || `HTTP_${status}`,
      details: error.details,
    }
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' })
  }

  async post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
