import './index.css';
import Header from './js/components/Header';
import SignUpPopUp from './js/components/SignUpPopUp';
import SignInPopUp from './js/components/SignInPopUp';
import SuccessPopUp from './js/components/SuccessPopUp';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import ProfilePage from './js/components/ProfilePage';

import {
  POPUP_SIGNUP,
  POPUP_SIGNIN,
  POPUP_SUCCESS,
  MAIN_API_OPTIONS,
  NEWS_API_OPTIONS,
  SEARCH_BUTTON,
  SEARCH_BAR,
  USER,
} from './js/constants/constants';

function handlePopup() {
  signUpPopUp.open(POPUP_SIGNUP);
  signInPopUp.setEventListeners();
}

const newsApi = new NewsApi(NEWS_API_OPTIONS);
const mainApi = new MainApi(MAIN_API_OPTIONS);
const profilePage = new ProfilePage(USER);
const newsCard = new NewsCard(mainApi, profilePage);
const header = new Header({ headerColor: 'main-regular', handlePopup }, newsCard);
const form = new Form(SEARCH_BUTTON, SEARCH_BAR);
const signUpPopUp = new SignUpPopUp(POPUP_SIGNUP, form, POPUP_SIGNIN, mainApi, POPUP_SUCCESS);
const successPopUp = new SuccessPopUp(POPUP_SUCCESS, POPUP_SIGNIN);

const CardsList = new NewsCardList(newsCard, newsApi, mainApi);
const signInPopUp = new SignInPopUp(POPUP_SIGNIN, form, POPUP_SIGNUP, mainApi, header, newsCard);

if (!USER) {
  header.render({ isLoggedin: false });
} else {
  header.render({ isLoggedin: true, userName: USER.name });
}

header.setEventListeners();
form.setEventListeners();
CardsList.setEventListeners();
newsCard.setEventListeners();
