export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((response) => {
    try {
      if (response.ok){// 201 response.status
        return response.json();
      }
      } catch(err){
        return (err);
    }
  })
  .then((res) => {
      return res;
  })
  .catch((err) => console.log(err));
}


export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
}