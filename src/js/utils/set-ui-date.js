export default function setUiDate(rawDate) {
  const date = new Date(rawDate);
  const year = date.getFullYear();
  const options = { month: 'long', day: 'numeric' };
  const dayAndWeek = date.toLocaleString('ru-RU', options);
  return `${dayAndWeek}, ${year}`;
}
