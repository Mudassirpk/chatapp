export async function postRequest(url, data, token) {
  const response = await fetch(`https://salty-taiga-44205.herokuapp.com${url}`, {
    method: `POST`,
    headers: {
      "x-auth-token": `${token ? "token " + token : "no token"}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    body: data ? JSON.stringify(data) : null,
  });

  if (response.status >= 200 && response.status <= 300) {
    return response;
  } else {
    return response;
  }
}

