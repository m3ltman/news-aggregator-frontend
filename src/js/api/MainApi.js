/* eslint-disable no-throw-literal */
export default class MainApi {
  constructor(options) {
    this.serverUrl = options.serverUrl;
  }

  signup(email, password, name, renderError, signUpSuccess) {
    return fetch(`${this.serverUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.text().then(() => {
          if (res.status === 400) {
            throw 'Такой пользователь уже есть';
          }
          throw 'На сервере произошла ошибка';
        });
      })
      .then((userData) => {
        signUpSuccess();
        return userData;
      })
      .catch((err) => {
        renderError(err);
      });
  }

  signin(email, password, renderError, signInSuccess) {
    return fetch(`${this.serverUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }
        return res.text().then(() => {
          if (res.status === 401 || res.status === 400) {
            throw 'Ошибка авторизации, проверьте введённые данные';
          }
          throw 'На сервере произошла ошибка';
        });
      })
      .then(_ => this.getUserData())
      .then((userData) => {
        localStorage.setItem('user', JSON.stringify({
          name: userData.name,
          email: userData.email,
        }));
        signInSuccess(userData.name);
      })
      .catch(err => renderError(err));
  }

  getUserData() {
    return fetch(`${this.serverUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then(userData => userData)
      .catch(err => err);
  }

  getArticles() {
    return fetch(`${this.serverUrl}/articles`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then(articles => articles);
  }

  createArticle(cardData) {
    return fetch(`${this.serverUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: cardData.keyword,
        title: cardData.title,
        text: cardData.text,
        date: cardData.date,
        source: cardData.source,
        link: cardData.link,
        image: cardData.image,
      }),
    });
  }

  removeArticle(cardId) {
    return fetch(`${this.serverUrl}/articles/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }
}
