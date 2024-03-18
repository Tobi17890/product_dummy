import i18n from '@/libraries/vue-i18n';
import EnumApiErrorCode from './enums/enumsApiErrorCode';

export interface IApiResponse<T = any> {
  Data: T,
  ErrorCode: EnumApiErrorCode,
  Message: string,
}

export default class ApiResponse<T = any> implements IApiResponse {
  Data: T;
  ErrorCode: EnumApiErrorCode;
  Message: string;

  get IsSuccess(): boolean {
    return this.ErrorCode === EnumApiErrorCode.Success;
  }

  get ErrorMessageForDisplay(): string {
    const { t, te } = i18n.global;
    if (EnumApiErrorCode[this.ErrorCode] && te(EnumApiErrorCode[this.ErrorCode])) {
      return t(EnumApiErrorCode[this.ErrorCode]);
    }
    return this.Message;
  }

  constructor(init: IApiResponse) {
    Object.assign(this, init);
  }
}
