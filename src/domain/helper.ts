import { DataMode } from './enums.js'

export function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}

export function getDateForHistoryData(date: Date, dataMode: DataMode = DataMode.Day): string {
  const year = date.getFullYear()
  const month = padTo2Digits(date.getMonth() + 1)
  const day = padTo2Digits(date.getDate())



  return (
    [
      year,
      month,
      day,
    ].join(''))
}

export function getTimezoneForHistoryData(date: Date) {
  var tzo = -date.getTimezoneOffset()
  var dif = tzo >= 0 ? '+' : '-'
  const pad = function (num: number) {
    return (num < 10 ? '0' : '') + num;
  }
  return dif + pad(Math.floor(Math.abs(tzo) / 60)) + ':' + pad(Math.abs(tzo) % 60)
}

export function getFormattedTimestamp(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}