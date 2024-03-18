import { ElNotification } from 'element-plus';
import enumMessageStatus from '@/models/enums/enumMessageType';
import { t } from '@/libraries/vue-i18n';

type TOption = {
  title?: string,
  traceId?: number,
}
const notification = (message: string, type: enumMessageStatus, title?:string, traceId?: number): void => {
  ElNotification({
    title,
    message: `${t(message)}${traceId ? ` (${traceId})` : ''}`,
    type,
    duration: 3000,
  });
};

const success = (message: string, opts: TOption = {}): void => {
  const { title, traceId } = opts;
  notification(message, enumMessageStatus.Success, title, traceId);
};

const error = (message: string, opts: TOption = {}): void => {
  const { title, traceId } = opts;
  notification(message, enumMessageStatus.Error, title, traceId);
};

const info = (message: string, opts: TOption = {}): void => {
  const { title, traceId } = opts;
  notification(message, enumMessageStatus.Info, title, traceId);
};

const warning = (message: string, opts: TOption = {}): void => {
  const { title, traceId } = opts;
  notification(message, enumMessageStatus.Warning, title, traceId);
};

export default {
  notification,
  success,
  error,
  info,
  warning,
};
