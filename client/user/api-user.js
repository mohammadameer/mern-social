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
  return fetch("/api/user/" + params.userId, {
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

const follow = (params, credentials, followId) => {
  return fetch("/api/users/follow/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({ userId: params.userId, followId: followId })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const unfollow = (params, credentials, unfollowId) => {
  return fetch("/api/users/unfollow/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({ userId: params.userId, unfollowId: unfollowId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const update = (params, credentials, user) => {
  return fetch("/api/user/" + params.userId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: user
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const findPeople = (params, credentials) => {
  return fetch("/api/users/findpeople/" + params.userId, {
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

const remove = (params, credentials) => {
  return fetch("/api/user/" + params.userId, {
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

export { create, list, read, update, remove, follow, unfollow, findPeople };
