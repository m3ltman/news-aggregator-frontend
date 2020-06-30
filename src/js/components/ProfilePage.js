/* eslint class-methods-use-this: 0 */
import { amountOfArticles } from '../constants/constants';
import capitalize from '../utils/capitalize';
import sortByFrequency from '../utils/sort-by-frequency';
import changeWordEnd from '../utils/change-word-end';

export default class ProfilePage {
  constructor(user) {
    this.user = user;
    this.renderResultsMarkUp = this.renderResultsMarkUp.bind(this);
  }

  _getResultsMarkUp(articles) {
    const keywords = articles.map(article => capitalize(article.keyword));
    const sortedKeywords = sortByFrequency(keywords);

    const resultsMarkUp = `
      <h2 class="saved-articles__header">Сохранённые статьи</h2>
      <p class="saved-articles__counter">${this.user.name}, у вас ${articles.length} ${changeWordEnd(articles.length)}</p>
      ${this.renderKeywords(sortedKeywords)}
    `;
    return resultsMarkUp;
  }

  renderKeywords(keywords) {
    if (keywords.length <= 3) {
      return `<p class="saved-articles__keywords">По ключевым словам: <b id="keywords-showed">${keywords.join(', ')}</b>`;
    }
    return (`
      <p class="saved-articles__keywords">По ключевым словам: <b id="keywords-showed">${keywords[0]}, ${keywords[1]}</b>
        и <b id="keywords-counted">${keywords.length - 2} другим</b>
      </p>
    `);
  }

  renderResultsMarkUp(articles) {
    amountOfArticles.textContent = '';
    amountOfArticles.insertAdjacentHTML('afterbegin', this._getResultsMarkUp(articles));
  }
}
