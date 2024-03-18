const numberFormatHelper = {
  addAccountingFormat(number: number | string, decimalPoint = 2): string {
    const cNumber = Number(number);
    const string = cNumber === undefined ? '' : cNumber.toFixed(decimalPoint);
    const [integer, decimal] = string.split('.');
    const newInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return [newInteger, decimal].filter((x) => x).join('.');
  },
  addNumberFormat(number: number | string, decimalPoint = 2): string {
    const cNumber = Number(number);
    const string = cNumber === undefined ? '' : cNumber.toFixed(decimalPoint);
    const [integer, decimal] = string.split('.');
    const newInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const result = [newInteger, decimal].filter((x) => x).join('.');
    return result.endsWith('.00') ? result.slice(0, -3) : result;
  },
  addAccountingFormatWithoutRoundUp(number: number, decimalPlaces = 2): string {
    if (number === 0 && decimalPlaces > 0) return `0.${'0'.repeat(decimalPlaces)}`;
    const numberParts = String(number).split('.');
    numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimalPlaces === 0) return numberParts[0];
    if (numberParts.length === 1) {
      return `${numberParts[0]}.${'0'.repeat(decimalPlaces)}`;
    }
    const formatted = `${numberParts[0]}.${numberParts[1].substring(0, decimalPlaces).padEnd(decimalPlaces, '0')}`;
    return formatted;
  },
  getNumberFormatByDecimalPoint(decimal: number, isHasColor = true): string {
    let numberFormat = isHasColor ? '[Blue]#,##0.00;[Red]-#,##0.00;0.00' : '0.00';
    if (decimal === 3) {
      numberFormat = isHasColor ? '[Blue]#,##0.000;[Red]-#,##0.000;0.000' : '0.000';
    } else if (decimal === 4) {
      numberFormat = isHasColor ? '[Blue]#,##0.0000;[Red]-#,##0.0000;0.0000' : '0.0000';
    } else if (decimal === 5) {
      numberFormat = isHasColor ? '[Blue]#,##0.00000;[Red]-#,##0.00000;0.00000' : '0.00000';
    } else if (decimal === 6) {
      numberFormat = isHasColor ? '[Blue]#,##0.000000;[Red]-#,##0.000000;0.000000' : '0.000000';
    }
    return numberFormat;
  },
};

export default numberFormatHelper;
