import {isEscapeKey} from './util.js';

const bigPhoto = document.querySelector('.big-picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const COMMENTS_TO_SHOW = 5;
const commentCount = bigPhoto.querySelector('.social__comment-count');

//Комментарии
const commentItems = document.querySelector('.social__comments');
const commentsLoader = bigPhoto.querySelector('.social__comments-loader');
const commentItem = commentItems.querySelector('.social__comment');

let currentComments = [];

const createFullPhoto = function (imageInfo, description) {

  imageInfo.addEventListener('click', () => { //По клику на фотографю
    bigPhoto.classList.remove('hidden'); // убрать класс невидимости у большой картинки
    bigPhoto.querySelector('img').src = description.url; // изображение
    bigPhoto.querySelector('.likes-count').textContent = description.likes; // Количество лайков
    bigPhoto.querySelector('.comments-count').textContent = description.comments.length; // Количество комментариев
    bigPhoto.querySelector('.social__caption').textContent = description.description; // Описание

    currentComments = description.comments;

    const createComments = (commentData) => {
      const commentСontainer = document.createDocumentFragment(); // Создание пустого фрагмента

      for (const comment of  commentData) {  // Для каждого комментария
        const commentItemClone = commentItem.cloneNode(true);

        commentItemClone.querySelector('.social__text').textContent = comment.message; // Комментарий
        commentItemClone.querySelector('img').alt = comment.name; // Имя автора комментария
        commentItemClone.querySelector('img').src = comment.avatar; // Аватар автора комментария

        commentСontainer.appendChild(commentItemClone); // Добавление комментариев в фрагмент

      }
      return commentСontainer; // возвращение фрагмента с комментариями
    };

    //Показ первых 5 комментариев
    const showFirstComments = (comments) => {
      const displayedComments = comments.slice(0, COMMENTS_TO_SHOW); // Нарезка первых 5 комментариев
      const renderFirstComments = createComments(displayedComments); // загрузка первыъ 5 комментариев

      commentsLoader.classList.remove('hidden');
      commentCount.firstChild.textContent = `${displayedComments.length  } из  `; // отображение количества загруженных комментариев
      commentItems.replaceChildren(renderFirstComments); // Заменить комментарии из шаблона на новые 5

      if(displayedComments.length === comments.length){ // Убирание кнопки загрузки, если количество комментариев достигло общее количество комментариев к фотографии
        commentsLoader.classList.add('hidden');
      }
    };

    //Загрузка последующих 5 комментариев
    const showMoreComments = () => {
      const moreComments = currentComments.slice(commentItems.children.length, commentItems.children.length + COMMENTS_TO_SHOW);// массив с новыми 5 комментариями
      const renderFirstComments = createComments(moreComments); // создание новых комментриев в шаблоне
      commentItems.appendChild(renderFirstComments); // Добавить новые комментарии

      if(commentItems.children.length === currentComments.length){
        commentsLoader.classList.add('hidden');
      }

      commentCount.firstChild.textContent = `${commentItems.children.length} из  `;
    };

    document.querySelector('body').classList.add('modal-open');

    showFirstComments(description.comments); // Вызов функции показа первых
    //  commentsLoader.onclick = showMoreComments;
    commentsLoader.addEventListener('click', showMoreComments);

    closeButton.addEventListener('click', () => { // Закрытие большого фото по крестику
      bigPhoto.classList.add('hidden');
      commentsLoader.removeEventListener('click', showMoreComments);
    });

    document.addEventListener('keydown', (evt) => { // Закртые большого фото по esc
      if (isEscapeKey(evt)) {
        bigPhoto.classList.add('hidden');
        commentsLoader.removeEventListener('click', showMoreComments);
      }
    });
  });
};

export {createFullPhoto};
