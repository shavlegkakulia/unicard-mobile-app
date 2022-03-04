import { getNumber } from "./converts";

export const formatDate = (
    dateString: string | undefined,
    separate?: string,
    includeTime?: boolean,
  ) => {
    if (!dateString) return '';
    let dateObj = new Date(dateString),
      month = dateObj.getUTCMonth() + 1, //months from 1-12
      day = dateObj.getUTCDate(),
      year = dateObj.getUTCFullYear(),
      minutes = dateObj.getMinutes(),
      hour = dateObj.getHours(),
      newdate =
        ('0' + day).slice(-2) +
        (separate || '.') +
        ('0' + month).slice(-2) +
        (separate || '.') +
        year +
        (includeTime
          ? ' ' + ('0' + hour).slice(-2) + ':' + ('0' + minutes).slice(-2)
          : '');
    return newdate;
  };
  
  export const minusMonthFromDate = (
    minusmonthcount: number = 1,
    date: Date | string | undefined = undefined,
  ) => {
    let _D;
    if (typeof date === 'string') {
      _D = new Date(date);
    } else if (typeof date === 'undefined') {
      _D = new Date();
    } else {
      _D = date;
    }
  
    _D?.setMonth(_D.getMonth() - minusmonthcount);
    return _D;
  };
  
  export const futureDay = (daysLeft: number) => {
    return new Date(
      Date.now() + getNumber(daysLeft) * 24 * 60 * 60 * 1000,
    ).toDateString();
  };
  
  export const dateDiff = (date1: Date, date2: Date) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    //@ts-ignore
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };