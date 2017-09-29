const superagent = require("superagent");

const magicRequest = (
  method,
  url,
  body,
  headers,
  queryParameters,
  form,
  reject,
  resolve
) => {
  let req = superagent(method, url).query(queryParameters);
  Object.keys(headers).forEach(key => {
    req.set(key, headers[key]);
  });
  if (body) {
    req.send(body);
  }
  if (typeof body === "object" && !(body.constructor.name === "Buffer")) {
    req.set("Content-Type", "application/json");
  }
  if (Object.keys(form).length > 0) {
    req.type("form");
    req.send(form);
  }
  req.end((error, response) => {
    if (error || !response.ok) {
      reject(error);
      this.errorHandlers.forEach(handler => handler(error));
    } else {
      resolve(response);
    }
  });
};

const stupidPromise = () => {
  return new Promise((resolve, reject) => {
    magicRequest(
      "GET",
      "https://swapi.co/api/people/1/",
      {},
      {
        accept: "application/json"
      },
      {
        a: "1",
        b: "2"
      },
      {},
      reject,
      resolve
    );
  });
};

it("renders without crashing", async () => {
  let response = await stupidPromise();
  expect(response.body.name).toBe('Luke Skywalker')
});
