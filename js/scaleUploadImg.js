const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const smaller = imgUploadWrapper.querySelector('.scale__control--smaller');
const bigger = imgUploadWrapper.querySelector('.scale__control--bigger');
const scaleValue = imgUploadWrapper.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadWrapper.querySelector('.img-upload__preview img');


const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

smaller.addEventListener('click', () => {
  let value = parseInt(scaleValue.value, 10);
  if(value > MIN_SCALE) {
    value = value - STEP_SCALE;
    scaleValue.value = `${value  }%`;
    imgUploadPreview.style.transform = `scale(${value/100})`;
  }
});

bigger.addEventListener('click', () => {
  let value = parseInt(scaleValue.value, 10);
  if(value < MAX_SCALE) {
    value = value + STEP_SCALE;
    scaleValue.value = `${value  }%`;
    imgUploadPreview.style.transform = `scale(${value/100})`;
  }
});

const changeTransform =  function () {
  imgUploadPreview.style.transform = '';
  scaleValue.value = '100%';
};

export {changeTransform};
