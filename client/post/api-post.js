export const listNewsFeed = (params, Credentials) => {
  return fetch("/api/posts/feed/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + Credentials.t
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const listByUser = (params, Credentials) => {
  return fetch("/api/posts/by/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + Credentials.t
    }
  }).then(response => response.json());
};

export const create = (params, credentials, post) => {
  return fetch("/api/posts/new/" + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: post
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const remove = (params, credentials) => {
  return fetch("/api/posts/" + params.postId, {
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

export const like = (params, credentials, postId) => {
  return fetch("/api/posts/like/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({ userId: params.userID, postId: postId })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const unlike = (params, credentials, postId) => {
  return fetch("/api/posts/unlike/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({ userId: params.userId, postId: postId })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const comment = (params, credentials, postId, comment) => {
  return fetch("/api/posts/comment/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({
      userId: params.userId,
      postId: postId,
      comment: comment
    })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const uncomment = (params, credentials, postId, comment) => {
  return fetch("/api/posts/uncomment/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify({
      userId: params.userId,
      postId: postId,
      comment: comment
    })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};
