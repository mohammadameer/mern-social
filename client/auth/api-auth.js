const signin = user => {
  return fetch("/auth/signin/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const signout = () => {
  return fetch("/auth/signout/", {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export default { signin, signout };
