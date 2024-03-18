import { ref, type Ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import store from '@/store'
import { includes, toLower } from 'lodash-es'

interface IAuthentication {
  isAuthenticated: Ref<boolean>
}

export default {
  setup(): IAuthentication {
    const route = useRoute()
    const isAuthenticated = ref(store.state.auth)

    const checkAuthentication = () => {
      if (!isAuthenticated.value && !includes(toLower(route.path), 'login')) {
        return router.push('/logout')
      }
      return true
    }
    onMounted(checkAuthentication)
    return { isAuthenticated }
  }
}
