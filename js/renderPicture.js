// import {generateElements} from './data.js';
import {createFullPhoto} from './fullPhoto.js';
import {randomNumber, debounce} from './util.js';
import {getData, amountPhotoArray} from './api.js';

const pictures = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragmentDescription  = document.createDocumentFragment();
export const filterBlock = document.querySelector('.img-filters');

const filterDefault = filterBlock.querySelector('#filter-default');
const filterRandom = filterBlock.querySelector('#filter-random');
const filterDiscussed = filterBlock.querySelector('#filter-discussed');

const filterButtons = filterBlock.querySelectorAll('.img-filters__button'); // Кнопки фильтра

function removeOldList() {
  pictures.querySelectorAll('.picture').forEach((item) => item.remove());
}

// Получение уникального id
const amountPhoto = 10; // фото необходимо выводить
let previousValues = []; // массив с id

const createRandomId = function (){
  previousValues = [];
  function createRandomIdFromRangeGenerator (min, max) {
    let currentValue = randomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = randomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  }

  for (let index = 0; index < amountPhoto; index++){
    createRandomIdFromRangeGenerator(0, amountPhotoArray);
  }
};

// Сортировка по количеству обсуждений
const getSort = (a, b) => {
  if (a.comments.length > b.comments.length) {
    return -1; }
  if (a.comments.length < b.comments.length) {
    return 1; }
  return 0;
};

export const renderPhoto = (dates, mode) => {

  if(mode === 'Default') {
    dates.forEach((photoInfo) => {
      const oneImage = imageTemplate.cloneNode(true);

      oneImage.querySelector('img').src = photoInfo.url;
      oneImage.querySelector('.picture__likes').textContent = photoInfo.likes;
      oneImage.querySelector('.picture__comments').textContent = photoInfo.comments.length;

      createFullPhoto(oneImage,photoInfo);

      fragmentDescription.appendChild(oneImage);
    });
  } else if (mode === 'Discussed') {
    dates.sort(getSort);

    dates.forEach((photoInfo) => {
      const oneImage = imageTemplate.cloneNode(true);

      oneImage.querySelector('img').src = photoInfo.url;
      oneImage.querySelector('.picture__likes').textContent = photoInfo.likes;
      oneImage.querySelector('.picture__comments').textContent = photoInfo.comments.length;

      createFullPhoto(oneImage,photoInfo);

      fragmentDescription.appendChild(oneImage);
    });
  } else if (mode === 'Random') {
    createRandomId();
    dates.forEach((photoInfo) => {
      if(previousValues.includes(photoInfo.id)){
        const oneImage = imageTemplate.cloneNode(true);

        oneImage.querySelector('img').src = photoInfo.url;
        oneImage.querySelector('.picture__likes').textContent = photoInfo.likes;
        oneImage.querySelector('.picture__comments').textContent = photoInfo.comments.length;

        createFullPhoto(oneImage,photoInfo);

        fragmentDescription.appendChild(oneImage);
      }

    });
  }
  pictures.appendChild(fragmentDescription);
};

// Фильтрация

filterDefault.addEventListener('click', debounce(() => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  removeOldList();
  getData('Default');
  filterDefault.classList.add('img-filters__button--active');
},500));

filterRandom.addEventListener('click', debounce(() => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  removeOldList();
  getData('Random');
  filterRandom.classList.add('img-filters__button--active');
},500));

filterDiscussed.addEventListener('click', debounce(() => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  removeOldList();
  getData('Discussed');
  filterDiscussed.classList.add('img-filters__button--active');
},500));
