import apis from '@/api/apis'
import formHelper from '@/libraries/elementUiHelpers/formHelper'
import notificationHelper from '@/libraries/elementUiHelpers/notificationHelper'
import { t } from '@/libraries/vue-i18n'
import EnumMessageType from '@/models/enums/enumMessageType'
import EnumApiErrorCode from '@/models/enums/enumsApiErrorCode'
import type { IRequestLogin } from '@/models/loginResponse'
import store from '@/store'
import type { FormInstance } from 'element-plus'
import { reactive, ref, type Ref } from 'vue'

interface IUseLogin {
  loginFormData: IRequestLogin
  formRef: Ref<FormInstance | undefined>
  formRule: any
  isLoading: Ref<boolean>
  passwordFormat: () => void
  submitLogin: (formEl: FormInstance) => void
}
enum PasswordLength {
  minLength = 6,
  maxLength = 20
}
export default function useLogin(): IUseLogin {
  const formRef = ref<FormInstance>()
  const loginFormData: IRequestLogin = reactive({
    username: '',
    password: ''
  })
  console.log('loginFormData', loginFormData)
  const passwordFormat = () => {
    if (
      loginFormData.password.length < PasswordLength.minLength ||
      loginFormData.password.length > PasswordLength.maxLength
    ) {
      return t('passwordlenght')
    }
    if (!/^[A-Za-z0-9]+$/.test(loginFormData.password)) {
      return t('password_only_letter_number')
    }
    if (!/[A-Za-z]/.test(loginFormData.password)) {
      return t('passwordlater')
    }
    if (!/\d/.test(loginFormData.password)) {
      return t('passwordnumber')
    }
    return ''
  }
  const rules = {
    username: { required: true },
    password: { customRule: passwordFormat, required: true }
  }
  const isLoading = ref(store.state.auth)
  const formRule = formHelper.getRules(rules)
  const proceedLogin = async () => {
    isLoading.value = true
    const response = await apis.login(loginFormData)
    if (response.ErrorCode === EnumApiErrorCode.Success) {
      const { id, token, email, firstname } = response.Data
    } else {
      notificationHelper.notification(response.ErrorMessageForDisplay, EnumMessageType.Error)
    }
    isLoading.value = false
  }
  const submitLogin = formHelper.getSubmitFunction(proceedLogin)

  return {
    loginFormData,
    formRef,
    formRule,
    isLoading,
    submitLogin,
    passwordFormat
  }
}
