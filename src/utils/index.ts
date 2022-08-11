import {Dimensions} from 'react-native';
import moment from 'moment-timezone';

export const TITLEWIDTH = (Dimensions.get('window').width / 100) * 80;
export const LEFTWIDTH = (Dimensions.get('window').width / 100) * 10;
export const RIGHTWIDTH = (Dimensions.get('window').width / 100) * 10;

export function timeDiffCalc(dateFuture: any) {
  const dateNow: any = new Date();
  dateFuture = new Date(dateFuture);

  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  if (days > 0 && days <= 7) {
    difference = days === 1 ? `${days} day ago` : `${days} days ago`;
    return difference;
  }
  if (days <= 0 && (hours > 0 || minutes >= 0)) {
    if (hours > 0) {
      difference = hours === 1 ? `${hours} hr ago` : `${hours} hrs ago`;
      return difference;
    }
    if (minutes >= 0) {
      difference =
        minutes === 0 || minutes === 1 ? `Just now` : `${minutes} minutes ago`;
      return difference;
    }
  }
  // return the post created date
  const getCurrentYear =
    dateFuture.getFullYear() !== dateNow.getFullYear()
      ? dateFuture.getFullYear()
      : '';
  difference = `${getMonthName(
    dateFuture.getMonth(),
  )}  ${dateFuture.getDate()} ${
    getCurrentYear !== '' ? `, ${getCurrentYear}` : ''
  }`;
  return difference;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonthName = (monthNumber: number) => {
  return monthNames[monthNumber];
};

// const getShortMonthName = function (monthNumber: number) {
//     return getMonthName(monthNumber).substr(0, 3);
// };

const toFixed = (num: any, fixed: number) => {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
};

export const formatCount = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) {
    return `${+toFixed(n / 1e3, 1)}K`;
  }
  if (n >= 1e6 && n < 1e9) {
    return `${+toFixed(n / 1e6, 1)}M`;
  }
  if (n >= 1e9 && n < 1e12) {
    return `${+toFixed(n / 1e9, 1)}B`;
  }
  return null;
};

export const getFormData = (data: any, allowEmptyOrNull = false): FormData => {
  const formData = new FormData();

  Object.keys(data).map(async key => {
    if (!(data[key] == null || data[key].length === 0) || allowEmptyOrNull) {
      formData.append(key, data[key]);
    }
  });

  return formData;
};

function dateOrdinal(dom: number) {
  if (dom === 31 || dom === 21 || dom === 1) return 'st';
  if (dom === 22 || dom === 2) return 'nd';
  if (dom === 23 || dom === 3) return 'rd';
  return 'th';
}

export const dateFormatter = (d: any) => {
  const month = 'MMMM';
  return `${moment(d).format('dddd')}, ${moment(d).format('DD')} ${moment(
    d,
  ).format(month)} ${moment(d).format('yyyy')}   `;
};

const getTimeZone = (t: string, d: string) => {
  const timeZone = moment(d).tz(t).format('ha z');
  const zone = timeZone.split(' ');
  return zone[1].toUpperCase();
};
export const emojisData = [
  {title: ':-) ,:) ,:] ,=) ', code: 1815},
  {title: ':-( ,:( ,:[ ,=( ', code: 1779},
  {title: ':-d ,:d ,=d ,=D ,:D ,-D ', code: 1750},
  {title: '8-| ,8| ,b-| ,b| ,B-| ,B| ', code: 1763},
  {title: ';-) ,;) ', code: 1758},
  {title: ':-o ,:o ,:-O ,:O ', code: 1795},
  {title: ':-p ,:p ,=p ,-P ,:P ,=P ', code: 1776},
];

export const sqlInjectionTxt = `'\b','\0`;
// '\b,\0,\n,\r,\t,\Z';
export const randomName = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isValidHttpUrl = (webURL: string) => {
  if (webURL.includes('https') || webURL.includes('http')) {
    return webURL;
  }
  return `https://${webURL}`;
};

export function textEllipsis(
  str: string,
  maxLength: number,
  {side = 'end', ellipsis = '...'} = {},
) {
  if (str.length > maxLength) {
    switch (side) {
      case 'start':
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case 'end':
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
}


