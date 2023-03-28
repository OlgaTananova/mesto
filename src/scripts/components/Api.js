/** API Class to fetch data from the server**/

export default class Api {
  constructor({baseURL, headers}) {
    this._URL = baseURL;
    this._headers = headers;
  }

  _handleError(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${errorText}. Error status: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._URL + '/users/me', {
      method: 'GET', headers: this._headers,
    })
      .then((res) => {
        return this._handleError(res, 'Error, it failed to load the user\'s data.');
      });
  }


  getInitialCards() {
    return fetch(this._URL + '/cards', {
      method: 'GET', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to load the cards.')
      });
  }

  editProfile({name, description}) {
    return fetch(this._URL + '/users/me', {
      method: 'PATCH', headers: this._headers, body: JSON.stringify({
        name: name, about: description
      })
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to update the user\'s info.')
      });
  }

  updateUserAvatar(avatarLink) {
    return fetch(this._URL + '/users/me/avatar', {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to update the user\'s avatar.')
      });
  }

  addNewCard({name, link}) {
    return fetch(this._URL + '/cards', {
      method: 'POST', headers: this._headers, body: JSON.stringify({
        name: name, link: link
      })
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to add a new card.')
      });
  }

  deleteCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId, {
      method: 'DELETE', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to delete the card.')
      });
  }

  likeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'PUT', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to like the card.')
      });
  }

  dislikeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'DELETE', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Error, it failed to dislike the card.')
      });
  }
}
