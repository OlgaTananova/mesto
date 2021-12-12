/** Класс UserInfo для управления данными пользователя **/

export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo['name'] = this._userName.textContent;
    this._userInfo['about'] = this._userDescription.textContent;
    return this._userInfo;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userDescription.textContent = userData.about;
    this._userName.id = userData._id;
    this._userAvatar.src = userData.avatar;
  }
}
