import { fetchUsersData, createUser, findUser, deleteUser } from './gateway.js';

const listElem = document.querySelector('.list');

export const renderUsers = usersList => {
  const usersElems = [...usersList]
    .sort((a, b) => a.name - b.name)
    .map(item => {
      const { name, username, email, phone, id } = item;
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list__item');
      listItemElem.setAttribute('id', id);
      const listItemElemName = document.createElement('p');
      listItemElemName.classList.add('list__item_name');
      const listItemElemUserName = document.createElement('p');
      listItemElemUserName.classList.add('list__item_username');
      const listItemElemEmail = document.createElement('p');
      listItemElemEmail.classList.add('list__item_email');
      const listItemElemPhone = document.createElement('p');
      listItemElemPhone.classList.add('list__item_phone');

      listItemElem.append(listItemElemName, name);
      listItemElem.append(listItemElemUserName, username);
      listItemElem.append(listItemElemEmail, email);
      listItemElem.append(listItemElemPhone, phone);

      return listItemElem;
    });

  listElem.innerHTML = '';
  listElem.append(...usersElems);
};

const userInfoElem = document.querySelector('.information');

const renderUserInfo = userInfo => {
  const { name, username, email, phone, id } = userInfo;
  const divItemElem = document.createElement('div');
  divItemElem.classList.add('user');
  divItemElem.setAttribute('id', id);
  const pElemName = document.createElement('p');
  pElemName.classList.add('user__info');
  pElemName.textContent = name;
  const pElemUserName = document.createElement('p');
  pElemUserName.classList.add('user__info');
  pElemUserName.textContent = username;
  const pElemEmail = document.createElement('p');
  pElemEmail.classList.add('user__info');
  pElemEmail.textContent = email;
  const pElemPhone = document.createElement('p');
  pElemPhone.classList.add('user__info');
  pElemPhone.textContent = phone;
  const deleteButtonElem = document.createElement('button');
  deleteButtonElem.classList.add('user__btn');
  deleteButtonElem.textContent = 'Delete';
  const closeButtonEl = document.createElement('button');
  closeButtonEl.classList.add('user__btn', 'close');
  closeButtonEl.textContent = 'Close';

  deleteButtonElem.addEventListener('click', () => {
    deleteUser(id);
    divItemElem.remove();
    fetchUsersData().then(userData => renderUsers(userData));
  })

  closeButtonEl.addEventListener('click', () => {
    divItemElem.remove();
  })

  divItemElem.append(pElemName);
  divItemElem.append(pElemUserName);
  divItemElem.append(pElemEmail);
  divItemElem.append(pElemPhone);
  divItemElem.append(deleteButtonElem);
  divItemElem.append(closeButtonEl);

  userInfoElem.innerHTML = '';
  userInfoElem.append(divItemElem);
};

const buttonElem = document.querySelector('.create-user-btn');

const addNewUser = () => {
  const nameElem = document.querySelector('.user__name');
  const userNameElem = document.querySelector('.user__user_name');
  const emailElem = document.querySelector('.user__email');
  const name = nameElem.value;
  const userName = userNameElem.value;
  const email = emailElem.value;
  if (name === '') {
    return;
  }
  if (userName === '') {
    return;
  }
  if (email === '') {
    return;
  }
  nameElem.value = '';
  userNameElem.value = '';
  emailElem.value = '';
  const user = { name: name, username: userName, email: email };
  createUser(user);
  fetchUsersData().then(userData => renderUsers(userData));
};

buttonElem.addEventListener('click', addNewUser);

fetchUsersData().then(userData => renderUsers(userData));

const elementLi = document.querySelector('.list');

const handleUser = event => {
  const id = event.target.id;
  findUser(id).then(user => renderUserInfo(user));
};

elementLi.addEventListener('click', handleUser);