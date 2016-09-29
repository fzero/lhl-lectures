const request = require('request');

function promisifiedGet(url) {
  let future = new Promise((resolve, reject) => {
    request.get(url, (err, response) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(response);
      }
    });
  });

  return future;
}


const url = process.argv[2];
console.log(`URL: ${url}`);

promisifiedGet(url)
.then((response) => {
  console.log(`HTML body is ${(response.body.length / 1024).toFixed(2)} Kbytes long.`);
})
.catch((err) => {
  console.log(`Something went wrong: ${err}`);
})
