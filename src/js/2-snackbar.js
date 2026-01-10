import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// ===== EVENT: submit form =====
form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = [...stateRadios].find(radio => radio.checked)?.value;

  if (!state || !delay) {
    iziToast.error({
      message: 'Please enter delay and select a state!',
      position: 'topRight',
    });
    return;
  }

  createPromise(delay, state)
    .then(delay => {
      // промис выполнен
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      // промис отклонён
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  // сброс формы
  form.reset();
});
