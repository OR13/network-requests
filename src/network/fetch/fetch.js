const fetch = require("isomorphic-fetch");
const qs = require('qs');

const fetchRequest = (
  method,
  url,
  body,
  headers,
  queryParameters,
  form,
  reject,
  resolve
) => {
  let actualBody = Object.keys(body).length ? body : form;

  fetch(url + '?' + qs.stringify(queryParameters), {
    method: method,
    headers: headers,
    body: actualBody
  }).then(async (result)=>{
      resolve(await result.json())
  })
  .catch((err) =>{
    // this.errorHandlers.forEach(handler => handler(error));
    reject(err);
  })

};

export const fetchPromise = () => {
  return new Promise((resolve, reject) => {
    fetchRequest(
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
