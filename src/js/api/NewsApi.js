/* eslint-disable no-throw-literal */
import getRidOfNull from '../utils/get-rid-of-null';

export default class NewsApi {
  constructor({ serverUrl, apiKey, userInput, today, aWeekAgo }) {
    this.serverUrl = serverUrl;
    this.apiKey = apiKey;
    this.userInput = userInput;
    this.today = today;
    this.aWeekAgo = aWeekAgo;
  }

  getNews(renderResults, renderLoading, renderError) {
    return fetch(`${this.serverUrl}?q=${this.userInput.value}&apiKey=${this.apiKey}&from=${this.today}&to=${this.aWeekAgo}&language=ru&pageSize=${100}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
      })
      .then((news) => {
        getRidOfNull(news.articles);
        renderResults(news.articles);
      })
      .catch(err => renderError(err))
      .finally(_ => renderLoading(false));
  }
}
