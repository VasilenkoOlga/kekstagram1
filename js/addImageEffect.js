const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const imgUploadPreview = imgUploadWrapper.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.effect-level'); // поле для ползунка
const sliderElement = document.querySelector('.effect-level__slider'); //Полоска для ползунка
const effectsList = document.querySelector('.effects__list'); // Список эффектов
const effectLevelValue = document.querySelector('.effect-level__value'); // Значение эффекта

let currentEffect = ''; // Название текущего эффекта
let effectUnitMeasure = ''; // Единица измерения эффекта

const DEFAULT_START_VALUE = 100;
const sliderOptions = {
  'NONE': {
    RANGE: {
      MIN: 0,
      MAX: 1,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: '',
    EFFECT_UNIT_MEASURE: '',
    CLASS: '',
  },
  'CHROME': {
    RANGE: {
      MIN: 0,
      MAX: 1,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'grayscale',
    EFFECT_UNIT_MEASURE: '',
    CLASS: 'effects__preview--chrome',
  },
  'SEPIA': {
    RANGE: {
      MIN: 0,
      MAX: 1,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'sepia',
    EFFECT_UNIT_MEASURE: '',
    CLASS: 'effects__preview--sepia',
  },
  'MARVIN': {
    RANGE: {
      MIN: 0,
      MAX: 100,
    },
    START: 0,
    STEP: 1,
    CURRENT_EFFECT: 'invert',
    EFFECT_UNIT_MEASURE: '%',
    CLASS: 'effects__preview--marvin',
  },
  'PHOBOS': {
    RANGE: {
      MIN: 0,
      MAX: 3,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'blur',
    EFFECT_UNIT_MEASURE: 'px',
    CLASS: 'effects__preview--phobos',
  },
  'HEAT': {
    RANGE: {
      MIN: 1,
      MAX: 3,
    },
    START: 0,
    STEP: 0.1,
    CURRENT_EFFECT: 'brightness',
    EFFECT_UNIT_MEASURE: '',
    CLASS: 'effects__preview--heat',
  },
};

function resetEffect() {
  imgUploadPreview.classList = '';
  imgUploadPreview.style.filter = '';
  sliderContainer.style.display = 'none';
}

function setFilterClass(className) { // Добавление нового класса эффекта у фото
  imgUploadPreview.classList = '';
  imgUploadPreview.classList.add(className);
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

function updateSliderOptions({ RANGE: { MIN, MAX }, START, STEP, CURRENT_EFFECT, EFFECT_UNIT_MEASURE }, startValue, display) {
  currentEffect = CURRENT_EFFECT;
  effectUnitMeasure = EFFECT_UNIT_MEASURE;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN,
      max: MAX,
    },
    start: START,
    step: STEP,
  });

  sliderElement.noUiSlider.set(startValue);
  sliderContainer.style.display = display;
}

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => { // Информация о ручке
  imgUploadPreview.style.filter = `${currentEffect}(${unencoded[handle]}${effectUnitMeasure})`;

  effectLevelValue.setAttribute('value', unencoded[handle]);
});

effectsList.addEventListener('change', (evt) => {
  const target = evt.target;
  const targetEffect = target.value.toUpperCase();

  if (target && target.value === 'none') {
    resetEffect();

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'none');
  } else {
    setFilterClass(sliderOptions[targetEffect].CLASS);

    updateSliderOptions(sliderOptions[targetEffect], DEFAULT_START_VALUE, 'block');
  }
});

export {resetEffect};
