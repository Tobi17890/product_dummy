import ApiResponse from '@/models/apiResponse'
import type { IAxiosPromise } from '@/models/axiosPromise'
import type { IRequestLogin, IResponseLogin } from '@/models/loginResponse'
import apiCalling from './apiCalling'

const getResponse = (response: IAxiosPromise) =>
  response.then((value) => new ApiResponse(value.data))

export default {
  login(request: IRequestLogin): Promise<ApiResponse<IResponseLogin>> {
    return getResponse(apiCalling.callLogin(request))
  }
}
