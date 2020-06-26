/* eslint class-methods-use-this: 0 */
import BaseComponent from './BaseComponent';
import {
  RESULTS_CONTAINER,
  CARDS_CONTAINER,
  PRELOADER,
  SEARCH_BUTTON,
  NOT_FOUND,
  RESULTS_SUCCESS,
  RESULTS_ERROR,
  SHOWMORE_BUTTON,
} from '../constants/constants';
import chunkArray from '../utils/chunk-array';

export default class NewsCardList extends BaseComponent {
  constructor(cardClass, newsApi, mainApi) {
    super();
    this.card = cardClass;
    this.newsApi = newsApi;
    this.mainApi = mainApi;
    this.renderResults = this.renderResults.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.articlesChunksCounter = 0;
    this.chunkedArticles = [];
  }

  renderResults(articles) {
    if (articles.length === 0) {
      NOT_FOUND.classList.add('not-found_visible');
      RESULTS_SUCCESS.classList.remove('results__success_visible');
      RESULTS_ERROR.classList.remove('results__error_visible');
    } else {

      if (articles.length > 3) {
        SHOWMORE_BUTTON.classList.add('results__show-button_visible');
      }

      chunkArray(articles, this.chunkedArticles);
      // const getSavedData = (savedArticles) => {
      //   console.log(savedArticles);
      //   const newsApiArticleUrls = articles.map(article => article.url);
      //   const savedArticlesUrls = savedArticles.map(article => article.link);
      //   const intersections = newsApiArticleUrls.filter(article => savedArticlesUrls.includes(article));
      //   const ids = savedArticles.map(article => article._id);
      //   const data = [intersections, ids];
      //   return data;
      // };

      this.addCard(this.chunkedArticles[0]);

      RESULTS_SUCCESS.classList.add('results__success_visible');
      NOT_FOUND.classList.remove('not-found_visible');
      RESULTS_ERROR.classList.remove('results__error_visible');
    }
  }

  addCard(cards) {
    cards.forEach((card) => {
      this.card.create(
        card.title,
        card.publishedAt,
        card.description,
        card.urlToImage,
        card.source.name,
        card.url,
        { page: 'main' },
      );
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      RESULTS_CONTAINER.classList.add('results_hidden');
      PRELOADER.classList.add('preloader_visible');
    } else {
      RESULTS_CONTAINER.classList.remove('results_hidden');
      PRELOADER.classList.remove('preloader_visible');
    }
  }

  clearResults() {
    CARDS_CONTAINER.textContent = '';
    this.chunkedArticles = [];
    this.articlesChunksCounter = 0;
    SHOWMORE_BUTTON.classList.remove('results__show-button_visible');;
  }

  renderError(text) {
    RESULTS_SUCCESS.classList.remove('results__success_visible');
    NOT_FOUND.classList.remove('not-found_visible');
    RESULTS_ERROR.textContent = text;
    RESULTS_ERROR.classList.add('results__error_visible');
  }

  showMore() {
    const nextArticles = this.chunkedArticles[this.articlesChunksCounter + 1];

    this.addCard(nextArticles);
    this.articlesChunksCounter += 1;

    if (this.articlesChunksCounter + 1 === this.chunkedArticles.length) {
      SHOWMORE_BUTTON.classList.remove('results__show-button_visible');
    }
  }

  setEventListeners() {
    this._setHandlers([
      { element: SEARCH_BUTTON, event: 'click', callback: _ => { this.clearResults(); this.renderLoading(true); this.newsApi.getNews(this.renderResults, this.renderLoading, this.renderError); } },
      { element: SHOWMORE_BUTTON, event: 'click', callback: _ => this.showMore() },
    ]);
  }
}
