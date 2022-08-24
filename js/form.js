import {isEscapeKey} from './util.js';
import {changeTransform} from './scaleUploadImg.js';
import {resetEffect} from './addImageEffect.js';

const fotoInput = document.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeEditForm = editForm.querySelector('#upload-cancel');
const hashTags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const form = document.querySelector('#upload-select-image');

//Открытие закрытие формы
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!(hashTags === document.activeElement || textDescription === document.activeElement)){
      evt.preventDefault();
      closerEditForm();
    }
  }
};

const openerEditForm = function () {
  editForm.classList.remove('hidden');
  body.classList.add('modal-open');
  resetEffect();
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closerEditForm = function () {
  editForm.classList.add('hidden');
  body.classList.remove('modal-open');
  fotoInput.value = '';
  changeTransform();
  form.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

fotoInput.addEventListener('change', () => {
  openerEditForm();
});

closeEditForm.addEventListener('click', () => {
  closerEditForm();
});


// Хештеги и комментарии
const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_VALID_REGEX = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

hashTags.addEventListener('input', () => {
  const hashValue = hashTags.value;

  const hashArray = hashValue.toUpperCase().trim().split(' ');
  const  hashArrayLength = hashArray.length;
  const hashArrayWithoutDuplicates = [...new Set(hashArray)]; //массив без дубликатов

  if (!hashValue) {
    hashTags.setCustomValidity('');
  } else {
    for(let index = 0;index < hashArray.length;index++) {
      if (!HASHTAG_VALID_REGEX.test(hashArray[index])) {
        hashTags.setCustomValidity(`- хэш-тег начинается с символа #;
        - строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
        - хеш-тег не может состоять только из одной решётки;
        - максимальная длина одного хэш-тега 20 символов, включая решётку`);
      } else if(hashArrayLength > 5) {
        hashTags.setCustomValidity('Не бошьше 5 хеш-тегов');
      } else if(!(hashArrayLength === hashArrayWithoutDuplicates.length)) {
        hashTags.setCustomValidity('Хеш-теги не должны повторяться');
      } else{
        hashTags.setCustomValidity('');
      }
    }
    hashTags.reportValidity();
  }
});

// Комментарии
textDescription.addEventListener('input', () => {
  const valueLength = textDescription.value.length;

  if (valueLength > MAX_COMMENT_LENGTH){
    textDescription.setCustomValidity('Не больше 140 символов');
  } else if (valueLength <= MIN_COMMENT_LENGTH) {
    textDescription.setCustomValidity('Меньше 10');
  }
  else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
});

// Показ и закрытие окна успешной отправки
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

const showSuccess = function () {
  const cloneShowSuccess = messageSuccess.cloneNode(true);
  const buttonClose = cloneShowSuccess.querySelector('.success__button');
  const successBlock = cloneShowSuccess.querySelector('.success__inner');
  document.body.appendChild(cloneShowSuccess);

  buttonClose.addEventListener('click', () => {
    cloneShowSuccess.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      cloneShowSuccess.remove();
    }});

  document.addEventListener('click', (evt) => {
    if (!successBlock.contains(evt.target)) {
      cloneShowSuccess.remove();
    }
  });
};

const messageError = document.querySelector('#error').content.querySelector('.error');

const showError = function () {
  const cloneShowError = messageError.cloneNode(true);
  const buttonClose = cloneShowError.querySelector('.error__button');
  const errorBlock = cloneShowError.querySelector('.error__inner');
  document.body.appendChild(cloneShowError);

  buttonClose.addEventListener('click', () => {
    cloneShowError.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      cloneShowError.remove();
    }});

  document.addEventListener('click', (evt) => {
    if (!errorBlock.contains(evt.target)) {
      cloneShowError.remove();
    }
  });
};

export {closerEditForm, openerEditForm, showSuccess, showError, form};
