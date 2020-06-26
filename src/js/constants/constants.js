import getaWeekAgoDate from '../utils/get-a-week-ago-date';
import getToday from '../utils/get-today';

// Селекторы хэдэра
const MOBILE_MENU = document.querySelector('.header__show-menu-btn');
const HEADER = document.querySelector('.header');
const HEADER_BUTTON = document.querySelector('#logout-button');
// Селекторы попапа
const POPUP_SIGNUP = document.querySelector('.popup-signup');
const POPUP_SIGNIN = document.querySelector('.popup-signin');
const POPUP_SUCCESS = document.querySelector('.popup-success');
// Селекторы окна поиска
const SEARCH_CONTAINER = document.querySelector('.search__box');
const SEARCH_BAR = document.querySelector('.search__bar');
const SEARCH_BUTTON = document.querySelector('.search__button');
// Селекторы блока результатов
const RESULTS_CONTAINER = document.querySelector('.results');
const CARDS_CONTAINER = document.querySelector('.cards');
const RESULTS_SUCCESS = document.querySelector('.results__success');
const RESULTS_ERROR = document.querySelector('.results__error');
const PRELOADER = document.querySelector('.preloader');
const NOT_FOUND = document.querySelector('.not-found');
const SHOWMORE_BUTTON = document.querySelector('.results__show-button');
// Переменные API
const MAIN_API_OPTIONS = {
  serverUrl: 'https://api.news-aggregator.tk',
};
const NEWS_API_OPTIONS = {
  serverUrl: 'https://praktikum.tk/news/v2/everything',
  apiKey: '8ed261fbbab34d4a85c2193047cedd72',
  userInput: SEARCH_BAR,
  today: getToday(),
  aWeekAgo: getaWeekAgoDate(),
};

// Селекторы страницы профиля
const amountOfArticles = document.querySelector('.saved-articles');

// Разное
const USER = JSON.parse(localStorage.getItem('user'));

export {
  MOBILE_MENU,
  HEADER,
  HEADER_BUTTON,
  POPUP_SIGNUP,
  POPUP_SIGNIN,
  POPUP_SUCCESS,
  MAIN_API_OPTIONS,
  NEWS_API_OPTIONS,
  SEARCH_CONTAINER,
  SEARCH_BAR,
  SEARCH_BUTTON,
  CARDS_CONTAINER,
  RESULTS_CONTAINER,
  PRELOADER,
  NOT_FOUND,
  RESULTS_SUCCESS,
  RESULTS_ERROR,
  SHOWMORE_BUTTON,
  USER,
  amountOfArticles,
};
