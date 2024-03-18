// /* eslint-disable import/no-cycle */
// import { format } from 'date-fns';
import { t } from '@/libraries/vue-i18n'
import _ from 'lodash-es'
// import { EnumTypeOfAccount } from '@/models/enums/enumAccountType';
// import EnumTimeZone from '@/models/enums/enumTimeZone';
import store from '@/store'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
// import timeZoneForDisplay from '../timeZoneHelper';

dayjs.extend(dayjsUtc)

interface IOption {
  name: string
  value: number
}

const textHelper = {
  getTimeZoneFromStore() {
    // return 8;
    return store.state.timezone
  },
  convertToGMT4(date: string): Date | string {
    const dateTime = new Date(date)
    const orginalOffset = 4
    const dateConverted = new Date(new Date(date).getTime() + orginalOffset * 3600000)
    return `${format(dateConverted, 'MM-dd-yyyy')}`
  },
  addDefaultValue(text: string | undefined | null): string {
    const defaultValue = '--'
    let result = text ?? defaultValue
    result = result === '' ? defaultValue : result
    return result
  },
  getDateTimeByGMT(originalDate: Date, gmt = 4, isUseGMTMinus4 = true): Date {
    if (!isUseGMTMinus4) {
      return originalDate
    }
    const dateTime = new Date(originalDate)
    return new Date(dateTime.getTime() + (dateTime.getTimezoneOffset() - 60 * gmt) * 60000)
  },
  getDateBaseOnOffSet(date: Date, offset: string) {
    const currentTime = date
    const sign = offset.charAt(3) === '-' ? -1 : 1
    const hours = parseInt(offset.substr(4), 10)
    const minutes = parseInt(offset.substr(7), 10) || 0
    const offsetMinutes = (hours * 60 + minutes) * sign
    const currentUTCTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000
    const offsetTime = new Date(currentUTCTime + offsetMinutes * 60 * 1000)

    return offsetTime
  },
  displayDateTimeInGMT(originalDate: Date | string | number): Date {
    let targetOffset = 0
    const originalOffset = 4 // GMT-4 offset in hours
    const dateTime = new Date(originalDate)
    const timeZone: any = this.getTimeZoneFromStore()
    const targetTimeZone = Number(EnumTimeZone[timeZone])
    const isGMTMinus4 = targetTimeZone === EnumTimeZone['GMT-4']

    if (!isGMTMinus4) {
      switch (targetTimeZone) {
        case EnumTimeZone['GMT+6.5']: {
          targetOffset = EnumTimeZone['GMT+6.5']
          break
        }
        case EnumTimeZone['GMT+7']: {
          targetOffset = EnumTimeZone['GMT+7']
          break
        }
        case EnumTimeZone['GMT+8']: {
          targetOffset = EnumTimeZone['GMT+8']
          break
        }
        case EnumTimeZone['GMT+9']: {
          targetOffset = EnumTimeZone['GMT+9']
          break
        }
        default: {
          break
        }
      }
      return new Date(dateTime.getTime() + (originalOffset + targetOffset) * 3600000)
    }
    return dateTime
  },
  datetimeStringFormat(
    datetime: string | number,
    formatter: string,
    needChangeTimeZone = false
  ): string {
    let date = new Date(datetime)
    if (needChangeTimeZone) {
      date = this.displayDateTimeInGMT(datetime)
      return `${format(date, formatter)} (${timeZoneForDisplay(this.getTimeZoneFromStore())})`
    }
    return format(date, formatter)
  },
  getGmtMinusFourDate(originalDate: any, isStartDate = true): number {
    const dateTime = new Date(originalDate)
    const utc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000
    const newGMTMinus4Date = new Date(utc + 3600000 * -4)
    const date = isStartDate
      ? new Date(newGMTMinus4Date).setHours(0, 0, 0, 0)
      : new Date(newGMTMinus4Date).setHours(23, 59, 59, 59)
    return date
  },
  convertDateWithOffsetToGmtMinusFour(dateString: any, offset: string) {
    const formattedDate = dayjs(dateString).format('YYYY-MM-DDTHH:mm:ss')
    const date = dayjs(formattedDate)
    const offsetParts = offset.match(/^GMT([+-])(\d+)(\.(\d+))?$/)
    const offsetSign = offsetParts![1] === '+' ? 1 : -1
    const offsetHours = parseInt(offsetParts![2], 10)
    const offsetMinutes = offsetParts![4] ? parseFloat(`0.${offsetParts![4]}`) * 60 : 0
    const offsetValue = offsetSign * (offsetHours * 60 + offsetMinutes)
    const adjustedDate = date.utcOffset(offsetValue)
    const gmtMinus4Date = adjustedDate.utcOffset(-4 * 60)
    const formattedAdjustedDate = gmtMinus4Date.format('YYYY-MM-DD HH:mm:ss')

    return formattedAdjustedDate
  },
  getCurrentDatetimeByGMT4(originalDate: Date | string | number): string {
    const currentGMT = _.first(_.split(new Date().toTimeString().slice(9), ' (', 1))
    const date = _.replace(new Date(originalDate).toString(), `${currentGMT}`, 'GMT-0400')
    const dateTime = new Date(date)
    return dateTime.toString()
  },
  getDailyPlayerTableLimit(prefix: 'LIMITX' | 'LIMITPT' | 'LIMITTYPE', selected: number): any {
    const prefixOptions: Record<'LIMITX' | 'LIMITPT' | 'LIMITTYPE', Array<IOption>> = {
      LIMITX: [
        { name: t('unlimited'), value: 0 },
        { name: '3X', value: 3 },
        { name: '5X', value: 5 },
        { name: '10X', value: 10 }
      ],
      LIMITPT: [
        { name: t('unlimited'), value: 1 },
        { name: '10%', value: 0.1 },
        { name: '30%', value: 0.3 },
        { name: '50%', value: 0.5 },
        { name: '80%', value: 0.8 }
      ],
      LIMITTYPE: [
        { name: t('low'), value: 1 },
        { name: t('medium'), value: 2 },
        { name: t('high'), value: 3 },
        { name: t('vip'), value: 4 }
      ]
    }
    if (prefix === 'LIMITX' && selected === 0) {
      return prefixOptions[prefix]
    }
    return prefixOptions[prefix].filter((opt: IOption) => opt.value <= selected)
  },
  getOutStandingNameForDisplay(accountType: number): string {
    switch (accountType) {
      case EnumTypeOfAccount.sh:
        return 'shareholder_outstanding'
      case EnumTypeOfAccount.ssma:
        return 'ssma_outstanding'
      case EnumTypeOfAccount.sma:
        return 'sma_outstanding'
      case EnumTypeOfAccount.ma:
        return 'ma_outstanding'
      case EnumTypeOfAccount.agent:
        return 'agent_outstanding'
      default:
        return 'outstanding'
    }
  },
  getBalanceTitleNameForDisplay(accountType: number): string {
    switch (accountType) {
      case EnumTypeOfAccount.sh:
        return 'sh_balance_info'
      case EnumTypeOfAccount.ssma:
        return 'ssma_balance_info'
      case EnumTypeOfAccount.sma:
        return 'sma_balance_info'
      case EnumTypeOfAccount.ma:
        return 'ma_balance_info'
      case EnumTypeOfAccount.agent:
        return 'agent_balance_info'
      default:
        return 'company_balance_info'
    }
  }
}

export default textHelper
