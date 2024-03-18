import type { IAxiosPromise } from '@/models/axiosPromise'
import type { IRequestLogin, IResponseLogin } from '@/models/loginResponse'
import axios, { type AxiosInstance } from 'axios'

const BASE_URL = import.meta.env.VUE_APP_END_POINT

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  callLogin(request: IRequestLogin): IAxiosPromise<IResponseLogin> {
    return api.post('/auth/login', request)
    // return FakeAPI.login();
  }
}
