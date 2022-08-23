// Для загрузки файлов и показа их при загрузки на сервер
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png']; // подходящие для загрузки типы файлов
const fileChooser = document.querySelector('.img-upload__start input[type=file]'); // поле файла
const imgChooser = document.querySelector('.img-upload__preview img'); // Большое изображение
const imgsChooser = document.querySelectorAll('.effects__preview'); // Все мини изображения

// Показ загруженного изображдения до его загрузки на сервер
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0]; // загружаемый файл
  const fileName = file.name.toLowerCase(); // имя файла в нижнем регистре

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgChooser.src = URL.createObjectURL(file); // показ основного изображеня
    imgsChooser.forEach((img) => img.style.backgroundImage = `url(${  URL.createObjectURL(file)})`); // показ мини-версий изображения с эффектами
  }
});

