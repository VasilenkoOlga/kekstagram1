import { renderPhoto, filterBlock} from './renderPicture.js';
import {showAlert} from './util.js';
import {showError, showSuccess, closerEditForm, form} from './form.js';
let amountPhotoArray; // количество фото в данных
const dataImg = 'https://24.javascript.pages.academy/kekstagram/data';
const infoImgSent = 'https://24.javascript.pages.academy/kekstagram';

// Загрузка данных на страницу через fetch
const getData = (mode) => {
  fetch(dataImg)
    .then((response) => response.json())
    .then((photosInfo) => {

      amountPhotoArray = (photosInfo.length) -1;
      renderPhoto(photosInfo, mode);
      filterBlock.classList.remove('img-filters--inactive');

    })
    .catch(() => {
      showAlert('Ошибка загрузки данных');
    });
};

// Отправка формы на сервер
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      infoImgSent,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccess();
      } else {
        closerEditForm();
        showError();
      }
    })
      .catch(() => {
        closerEditForm();
        showError();
      });
  });
};

export {getData, amountPhotoArray,setUserFormSubmit};
