const create = user => {
  return fetch("api/users/", {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.error(err));
};

const list = () => {
  return fetch("/api/users/", {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const read = (params, credentials) => {
  return fetch("/api/users/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const update = (params, credentials, user) => {
  return fetch("/api/users/" + params.userId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const remove = (params, credentials) => {
  return fetch("/api/users/" + params.userId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export { create, list, update, remove };
