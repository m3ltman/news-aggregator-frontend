import ChangeDateFormat from './change-date-format';

export default function getaWeekAgoDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return ChangeDateFormat(date);
}
