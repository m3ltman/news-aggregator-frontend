import './index.css';
import Header from '../../js/components/Header';
import { USER, MAIN_API_OPTIONS } from '../../js/constants/constants';
import ProfilePage from '../../js/components/ProfilePage';
import MainApi from '../../js/api/MainApi';
import NewsCard from '../../js/components/NewsCard';

const mainApi = new MainApi(MAIN_API_OPTIONS);
const header = new Header({ headerColor: 'dark' });
const profilePage = new ProfilePage(USER);
const newsCard = new NewsCard(mainApi, profilePage);

if (!USER) {
  window.location.href = '../';
}

mainApi.getArticles()
  .then((articles) => {
    profilePage.renderResultsMarkUp(articles);
    articles.forEach(article => newsCard.create(
      article.title,
      article.date,
      article.text,
      article.image,
      article.source,
      article.link,
      { page: 'profile' },
      article.keyword,
      article._id,
    ));
  });

newsCard.setEventListeners();
header.setEventListeners();
header.render({ userName: USER.name });
