export default function ChangeDateFormat(date) {
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const changedDate = `${year}-${month}-${day}`;
  return changedDate;
}
