export default function changeWordEnd(num) {
  const words = ['cохранённая статья', 'cохранённые статьи', 'cохранённых статей'];
  if ((num=Math.abs(num%100)) > 20) num%=10;
  return words[(num > 4 || num === 0) + (num !== 1)];

}
