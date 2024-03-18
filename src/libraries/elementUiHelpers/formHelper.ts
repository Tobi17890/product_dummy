/* eslint-disable */
import { computed, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { t } from '@/libraries/vue-i18n';
import textHelper from '../formatHelpers/textFormatHelper';

const getValidator = (rule: () => string) => {
  const ruleForElemetUI = (_: any, __: string, callback: any) => {
    const result = rule();
    if (result !== '') {
      return callback(new Error(result));
    }
    return callback();
  };
  return ruleForElemetUI;
};

const checkIllegalCharacters = (_: any, value: any, callback: any) => {
  if(typeof(value) !== 'object' && /[<>]/.test(value)){
    return callback(new Error(t('can_not_include_illegal_characters')));
  }
  return callback();
}

export interface IRule {
  customRule?: () => string,
  required?: boolean,
  isTriggerByChange?: boolean;
}

const getRules = (rules: Record<string, IRule>) => {
  const result: Record<string, Array<object>> = {};
  Object.keys(rules).forEach((key) => {
    result[key] = [];
    let trigger = 'blur';
    if (rules[key].required) {
      trigger = rules[key].isTriggerByChange ? 'change' : 'blur';
      result[key].push({
        required: true,
        message: computed(() => t('required')),
        trigger,
      })
    }
    if (rules[key].customRule) {
      result[key].push({
        validator: getValidator(rules[key].customRule!),
        trigger,
        'startDate': 0,
      });
    }
  });
  return reactive(result);
};
const getSubmitFunction = (func: () => void) => {
  const submitFunction = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        func();
      }
    });
  };
  return submitFunction;
};
const checkDecimalInput = (inputVal: any) => {
  if (/\./.test(`${inputVal}`)) {
    return t('decimal_point_not_allow');
  }
  return '';
};
const checkNumberInput = (inputVal: any) => {
  if (!/^\d*$/.test(inputVal)) {
    return t('only_integer_number');
  } else if (inputVal.length > 20) {
    return t('Invalid amount. Please enter number between 1 - 20 digits');
  }
  return '';
}
const checkNumberWithTwoDecimalPoint = (inputVal: any) => {
  if (inputVal < 0) {
    return t('input_value_must_be_positive_value');
  } else if (inputVal.length > 20) {
    return t('Invalid amount. Please enter number between 1 - 20 digits');
  } else if (!/^(?:\d+|\d+\.\d{1,2})$/.test(inputVal)) {
    return t('input_value_allowed_only_2_decimal_places');
  }
  return '';
} 
const validateDate = (startDate: string, endDate: string, checkToday = false, today = new Date()) => {
  const startOfDay = new Date(textHelper.getDateTimeByGMT(today).setHours(0, 0, 0, 0));
  const st = new Date(startDate);
  st.setHours(0, 0, 0, 0);
  const en = new Date(endDate);
  en.setHours(0, 0, 0, 0);
  if (st.getTime() > en.getTime()) {
    return t('start_date_must_smaller_than_end_date');
  }
  if (checkToday) {
    if (st.getTime() < startOfDay.getTime()) {
      return t('date_cannot_less_than_today')
    }
    return '';
  }
  return '';
};
const checkUserPasswordValidation = (password: string): string =>  {
    if (password.length === 0 ) {
      return '';
    }
    if (password.length < 6 || password.length > 20) {
      return t('your_password_length_must_between_8-15_characters');
    }
    if (!(/^[A-Za-z0-9]+$/.test(password))) {
      return t('password_not_allow_special_character');
    }
    if (!(/[A-Za-z]/.test(password))) {
      return t('password_must_contain_with_letter');
    }
    if (!(/\d/.test(password))) {
      return t('password_must_contain_with_number');
    }
    return '';
};
const checkConfirmPassword = (oldPassword: string, newPassword: string): string => {
  if (oldPassword !== newPassword) {
    return t('password_does_not_match');
  }
  return '';
}

const checkNotRequiredEmail = (value: string): string => {
  if (value === '') {
    return '';
  } else {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
      return t('invalid_email');
    }
    return '';
  }
}

export default {
  checkDecimalInput,
  checkNumberInput,
  getRules,
  checkUserPasswordValidation,
  getSubmitFunction,
  validateDate,
  checkConfirmPassword,
  getValidator,
  checkNotRequiredEmail,
  checkNumberWithTwoDecimalPoint,
};
