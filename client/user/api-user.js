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
