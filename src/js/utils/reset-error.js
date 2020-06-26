export default function resetError(input, className) {
  if (input.parentNode.classList.contains(className)) {
    input.parentNode.classList.remove(className);
    input.textContent = '';
  }
}
