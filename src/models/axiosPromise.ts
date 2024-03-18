import type { IApiResponse } from './apiResponse'

// support apiFake
export interface IAxiosResponse<T = any> {
  data: IApiResponse<T>
}

export type IAxiosPromise<T = any> = Promise<IAxiosResponse<T>>
