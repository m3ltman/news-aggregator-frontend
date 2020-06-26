/* eslint-disable no-useless-constructor */
/* eslint-disable no-useless-escape */
/* eslint class-methods-use-this: 0 */
import BaseComponent from './BaseComponent';
import { CARDS_CONTAINER, SEARCH_BAR } from '../constants/constants';
import setUiDate from '../utils/set-ui-date';
import capitalize from '../utils/capitalize';

export default class NewsCard extends BaseComponent {
  constructor(mainApiClass, profileClass) {
    super();
    this._mainApi = mainApiClass;
    this._profileClass = profileClass;
    this.iconClickHandler = this.iconClickHandler.bind(this);
  }

  create(title, date, description, imageUrl, sourceName, sourceUrl, { page }, keyword, _id) {
    const listItems = /([<ol>]+[<\/ol>]+[<li>]+[<\/li>]+)/g;
    const card = `
    <div class="news-card" data-id="${_id}" data-owner="">
      <div class="news-card__header-wrapper">
        <button class="news-card__icon ${page === 'profile' ? 'news-card__icon_page_news' : ''}"></button>
        <button class="news-card__tooltip ${page === 'profile' ? 'news-card__tooltip_active news-card__tooltip_page_news' : ''}"></button>
        ${page === 'profile' ? `<i class="news-card__theme">${capitalize(keyword)}</i>` : ''}
      </div>
      <img class="news-card__pic" alt="Картинка новости" src="${imageUrl}" onerror="this.src='https://leeford.in/wp-content/uploads/2017/09/image-not-found.jpg';">
      <div class="news-card__content-wrapper">
        <time class="news-card__date">${page === 'profile' ? date : setUiDate(date)}</time>
        <h3 class="news-card__title">${title}</h3>
        <p class="news-card__text">${description.replace(listItems, '')}</p>
        <a class="news-card__source" href="${sourceUrl}" rel="noopener noreferrer" target="_blank">${sourceName}</a>
      </div>
    </div>
    `;
    CARDS_CONTAINER.insertAdjacentHTML('beforeend', card);
    this.renderCardIcons();
  }

  renderCardIcons() {
    const tipIcons = document.querySelectorAll('.news-card__tooltip');
    const saveBtns = document.querySelectorAll('.news-card__icon');

    if (!JSON.parse(localStorage.getItem('user'))) {
      tipIcons.forEach(tipIcon => tipIcon.classList.add('news-card__tooltip_active'));
      saveBtns.forEach(saveBtn => saveBtn.setAttribute('disabled', true));
    } else {
      tipIcons.forEach(tipIcon => tipIcon.classList.remove('news-card__tooltip_active'));
      saveBtns.forEach(saveBtn => saveBtn.removeAttribute('disabled'));
    }
  }

  iconClickHandler(e) {
    if (e.target.classList.contains('news-card__icon')) {
      const card = e.target.closest('.news-card');
      const cardData = {
        keyword: `${SEARCH_BAR ? SEARCH_BAR.value : null}`,
        title: card.querySelector('.news-card__title').textContent,
        text: card.querySelector('.news-card__text').textContent,
        date: card.querySelector('.news-card__date').textContent,
        source: card.querySelector('.news-card__source').textContent,
        link: card.querySelector('.news-card__source').href,
        image: card.querySelector('.news-card__pic').src,
      };

      if (e.target.classList.contains('news-card__icon_active')) {
        const clearCard = () => {
          card.dataset.id = '';
          card.dataset.owner = '';
          e.target.classList.remove('news-card__icon_active');
        };
        this._mainApi.removeArticle(card.dataset.id, clearCard);

      } else if (e.target.classList.contains('news-card__icon_page_news')) {
        CARDS_CONTAINER.removeChild(card);
        this._mainApi.removeArticle(card.dataset.id, this._profileClass.renderResultsMarkUp);

      } else {
        const fillCard = (article) => {
          card.dataset.id = article.article._id;
          card.dataset.owner = article.article.owner;
          e.target.classList.add('news-card__icon_active');
        };
        this._mainApi.createArticle(cardData, fillCard);
      }
    }
  }

  setEventListeners() {
    this._setHandlers([
      { element: CARDS_CONTAINER, event: 'click', callback: (e) => this.iconClickHandler(e) },
    ]);
  }
}
