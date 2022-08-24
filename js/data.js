import { randomNumber } from './util.js';

const NUMBERDESCRIPTION  = 25;
const MINLIKES = 15;
const MAXLIKES = 200;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const createComment = function(index) {
  return {
    id: index,
    avatar: `img/avatar-${ randomNumber(1,6)}.svg`,
    message: messages[randomNumber(0,messages.length-1)],
    name: NAMES[randomNumber(0,NAMES.length-1)],
  };
};

const createDescription = function (index){
  const objectDescription = {
    id:index,
    url: `photos/${ index }.jpg`,
    description: 'Кот',
    likes: randomNumber(MINLIKES, MAXLIKES),
    comments: [],
  };

  if((objectDescription.id % 2) !== 0 ) {
    objectDescription.comments.push(createComment(index));
    objectDescription.comments.push(createComment(index *100));
    objectDescription.comments.push(createComment(index *200));
    objectDescription.comments.push(createComment(index *300));
    objectDescription.comments.push(createComment(index *400));
    objectDescription.comments.push(createComment(index *500));
    objectDescription.comments.push(createComment(index *600));
    objectDescription.comments.push(createComment(index *700));
    objectDescription.comments.push(createComment(index *800));
    objectDescription.comments.push(createComment(index *900));
    objectDescription.comments.push(createComment(index *1000));
    objectDescription.comments.push(createComment(index *110));
    objectDescription.comments.push(createComment(index *120));
    objectDescription.comments.push(createComment(index *130));
    objectDescription.comments.push(createComment(index *140));
    objectDescription.comments.push(createComment(index *150));
  } else {
    objectDescription.comments.push(createComment(index));
    objectDescription.comments.push(createComment(index *100));
    objectDescription.comments.push(createComment(index *200));
    objectDescription.comments.push(createComment(index *300));
    objectDescription.comments.push(createComment(index *400));
    objectDescription.comments.push(createComment(index *500));
    objectDescription.comments.push(createComment(index *600));
    objectDescription.comments.push(createComment(index *700));
  }

  return {
    objectDescription,
  };
};

const photoDescriptions = [];

const generateData = function (photoDescriptions, number = 25) {
  for(let index = 1; index <= number ;index++) {
    photoDescriptions.push(createDescription(index));
  }
  return photoDescriptions;
};

const generateElements = generateData(photoDescriptions, NUMBERDESCRIPTION);

export {generateElements};
