import type { InjectionKey } from 'vue'
import { Store, createStore, useStore as baseUseStore } from 'vuex'

export interface State {
  id: string
  token: string
  auth: boolean
  email: string
  firstname: string
  lastname: string
  gender: string
  image: string
}

export const key: InjectionKey<Store<State>> = Symbol('Copy From Vuex Doc')

export default createStore<State>({
  state: {
    id: '',
    token: '',
    auth: false,
    email: '',
    firstname: '',
    lastname: '',
    gender: '',
    image: ''
  },
  mutations: {
    updateAuth(state, auth) {
      state.auth = auth
    },
    setUserInfo(state, payload) {
      state.id = payload.id
      state.token = payload.token
      state.email = payload.email
      state.firstname = payload.firstname
      state.lastname = payload.lastname
      state.image = payload.image
      state.gender = payload.gender
    }
  }
})
export function useStore(): Store<State> {
  return baseUseStore(key)
}
