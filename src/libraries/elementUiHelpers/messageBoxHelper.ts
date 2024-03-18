import EnumMessageType from '@/models/enums/enumMessageType';
import { ElMessageBox } from 'element-plus';
import { t } from '@/libraries/vue-i18n';

const confirm = async (type: EnumMessageType, callback: () => Promise<void>, content = t('are_you_sure')) => {
  ElMessageBox.confirm(content, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: t('okay'),
    type,
    showCancelButton: false,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        await callback();
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  });
};

export default confirm;
