export default function enableSubmitBtn(form) {
  const button = form.querySelector('.button');
  button.classList.remove('button_disabled');
  button.removeAttribute('disabled');
}
