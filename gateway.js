const baseUrl = 'https://jsonplaceholder.typicode.com/users';

export const createUser = userData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Faild to create User');
    }
    return response.json();
  });
};

export const fetchUsersData = () => {
  return fetch(baseUrl).then(response => response.json());
};

export const findUser = (userId) => {
  return fetch(`${baseUrl}/${userId}`).then(response => response.json());
}

export const deleteUser = (userId) => {
  return fetch(`${baseUrl}/${userId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Faild to create task');
    }
  });
}



// export const fetchUsersData = async () => {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
//     if (!response.ok) {
//       return null;
//     }
//     const userData = await response.json();
//     return userData;
//   } catch (err) {
//     throw new Error('Failed to fetch user');
//   }
// };

// const createUser = async userData => {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
//     if (!response.ok) {
//       return null;
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Failed to create user');
//   }
// };