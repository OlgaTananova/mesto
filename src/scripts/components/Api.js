/** Класс Api для сетевых запросов**/

export default class Api {
  constructor({baseURL, headers}) {
    this._URL = baseURL;
    this._headers = headers;
  }

  _handleError(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${errorText}. Статус ошибки: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._URL + '/users/me', {
      method: 'GET', headers: this._headers,
    })
      .then((res) => {
        return this._handleError(res, 'Ошибка, не удалось загрузить данные пользователя');
      })
      .catch(err => {
        alert(err)
      });
  }


  getInitialCards() {
    return fetch(this._URL + '/cards', {
      method: 'GET', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось загрузить карточки')
      })
      .catch(err => {
        alert(err);
      })

  }

  editProfile({name, description}) {
    return fetch(this._URL + '/users/me', {
      method: 'PATCH', headers: this._headers, body: JSON.stringify({
        name: name, about: description
      })
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось обновить профиль пользователя')
      })
      .catch(err => {
        alert(err)
      })
  }

  updateUserAvatar(avatarLink) {
    return fetch(this._URL + '/users/me/avatar', {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось обновить аватар пользователя')
      })
      .catch(err=>{
        alert(err);
      })
  }

  addNewCard({name, link}) {
    return fetch(this._URL + '/cards', {
      method: 'POST', headers: this._headers, body: JSON.stringify({
        name: name, link: link
      })
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось добавить карточку')
      })
      .catch(err => {
        alert(err)
      })
  }

  deleteCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId, {
      method: 'DELETE', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось удалить карточку')
      })
      .catch(err => {
        alert(err);
      })
  }

  likeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'PUT', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось поставить лайк карточке')
      })
      .catch(err => {
        alert(err);
      })
  }

  dislikeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'DELETE', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось удалить лайк карточки')
      })
      .catch(err => {
        alert(err);
      })
  }
}
