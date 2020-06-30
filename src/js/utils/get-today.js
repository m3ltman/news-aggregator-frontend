import ChangeDateFormat from './change-date-format';

export default function getToday() {
  const today = new Date();
  return ChangeDateFormat(today);
}
