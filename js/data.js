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

const createComment = function(i) {
  return {
    id: i,
    avatar: `img/avatar-${ randomNumber(1,6)}.svg`,
    message: messages[randomNumber(0,messages.length-1)],
    name: NAMES[randomNumber(0,NAMES.length-1)],
  };
};

const createDescription = function (i){
  const objectDescription = {
    id: i,
    url: `photos/${ i }.jpg`,
    description: 'Кот',
    likes: randomNumber(MINLIKES, MAXLIKES),
    comments: [],
  };

  if((objectDescription.id % 2) !== 0 ) {
    objectDescription.comments.push(createComment(i));
    objectDescription.comments.push(createComment(i *100));
    objectDescription.comments.push(createComment(i *200));
    objectDescription.comments.push(createComment(i *300));
    objectDescription.comments.push(createComment(i *400));
    objectDescription.comments.push(createComment(i *500));
    objectDescription.comments.push(createComment(i *600));
    objectDescription.comments.push(createComment(i *700));
    objectDescription.comments.push(createComment(i *800));
    objectDescription.comments.push(createComment(i *900));
    objectDescription.comments.push(createComment(i *1000));
    objectDescription.comments.push(createComment(i *110));
    objectDescription.comments.push(createComment(i *120));
    objectDescription.comments.push(createComment(i *130));
    objectDescription.comments.push(createComment(i *140));
    objectDescription.comments.push(createComment(i *150));
  } else {
    objectDescription.comments.push(createComment(i));
    objectDescription.comments.push(createComment(i *100));
    objectDescription.comments.push(createComment(i *200));
    objectDescription.comments.push(createComment(i *300));
    objectDescription.comments.push(createComment(i *400));
    objectDescription.comments.push(createComment(i *500));
    objectDescription.comments.push(createComment(i *600));
    objectDescription.comments.push(createComment(i *700));
  }

  return {
    objectDescription,
  };
};

const photoDescriptions = [];

const generateData = function (photoDescriptions, number = 25) {
  for(let i = 1; i <= number ;i++) {
    photoDescriptions.push(createDescription(i));
  }
  return photoDescriptions;
};

const generateElements = generateData(photoDescriptions, NUMBERDESCRIPTION);

export {generateElements};
