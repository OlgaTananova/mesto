
export default class Api {
  constructor({baseURL, headers}) {
    this._URL = baseURL;
    this._headers = headers;
  }
  getUserInfo() {
    return fetch(this._URL+'/users/me',{
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        alert(`Ошибка: ${err.status}, ${err.name}`)
      })
  }

  getInitialCards() {
    return fetch(this._URL+'/cards',{
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: не удалось загрузить карточки ${res.status}`);
      })
      .catch(err=>{
        alert(err);
      })

  }

  editProfile({name,description}){
    return fetch(this._URL+'/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
      .then(res=>{
        if (res.ok) {
          console.log(res.status);
          return
        }
        return Promise.reject(`Ошибка: не удалость загрузить данные.
        Статус ошибки ${res.status}`)
      })
      .catch(err=>{
        alert(err)
      })
  }

  updateUserAvatar(avatarLink){
    return fetch(this._URL+'/users/me/avatar',{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res=>{
        if (res.ok) {
          console.log(res.status);
          return
        }
        return Promise.reject(`Ошибка: не удалость загрузить данные.
        Статус ошибки ${res.status}`)
      })
      .catch(err=>{
        alert(err)
      })
  }

  addNewCard({name,link}) {
    return fetch(this._URL + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: не удалось загрузить карточку ${res.status}`);
      })
      .catch(err=>{
        alert(err)
        }
      )
  }

  deleteCard(cardId) {
    return fetch(this._URL+'/cards/'+cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res=>{
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: не удалось удалить карточку ${res.status}`)
      })
      .catch(err=>{
        alert(err);
      })
  }
  likeCard(cardId) {
    return fetch(this._URL+'/cards/'+cardId+'/likes/', {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res=>{
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: не удалось лайкнуть карточку ${res.status}`)
      })
      .catch(err=>{
        alert(err);
      })
  }

  dislikeCard(cardId) {
    return fetch(this._URL+'/cards/'+cardId+'/likes/', {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res=>{
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: не удалось убрать лайк с карточки ${res.status}`)
      })
      .catch(err=>{
        alert(err);
      })
  }
}
