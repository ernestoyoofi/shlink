## Simple Shortlink

Simple system shortlink with github api and vercel deployment to running nodejs. </br>
Example results in [https://mza.vercel.app/8f58e32466a9b6bc](https://mza.vercel.app/8f58e32466a9b6bc)

## How to create new id redirect ?

> **ENDPOINT CREATE**
```
HTTP REQUEST [POST] https://mza.vercel.app/api-urls
```


> Example For JavaScript (Nodejs)

```bash
npm init -y
npm i axios
```
```js
const axios = require("axios")

async createLink(url) {
  const options = {
    method: "POST",
    url: "https://mza.vercel.app/api-urls",
    headers: {
      "User-Agent": "Next Fetch/5.1"
    }
    data: JSON.stringify({url})
  }
  
  const results = await axios(options)
  
  return results.data
}

createLink("https://youtube.com/watch?v=dQw4w9WgXcQ").then((results) => {
  console.log(`Status create is ${results.msg} and url is ${results.data}`)
  
  // Output Example "Status create is Ok and url is https://mza.vercel.app/8f58e32466a9b6bc"
})
```
