export default function disableSubmitBtn(form) {
  const button = form.querySelector('.button');
  button.classList.add('button_disabled');
  button.setAttribute('disabled', true);
}
