require("dotenv").config()
const axios = require("axios")
const base64 = require("base-64")
/*
* @name github variabel
*/
const github_token = process.env.GITHUB_TOKEN,
      github_repos = process.env.GITHUB,
           link_id = process.env.LINK_ID

const url = `https://api.github.com/repos/${github_repos}/contents${link_id}`,
options = () => {
  return {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${github_token}`,
      "Content-Type": "application/json"
    }
  }
}

function getRespon(results) {
  return {
    path: results.path,
    sha: results.sha,
    content: JSON.parse(Buffer.from(results.content, "base64").toString("utf-8"))
  }
}

async function getShaFile() {
  return new Promise((yes, no) => {
    axios(options()).then((z) => {
      yes(getRespon(z.data))
    }).catch(error => {
      no(error)
    })
  })
}

async function uploadNew(id, url) {
  return new Promise((yes, no) => {
    getShaFile().then(z => {
      let append = { id, url }
      let content = z.content
      content.push(append)

      let config = options()
      config["method"] = "PUT"
      config["data"] = JSON.stringify({
        "message": "Add New Link !",
        "sha": z.sha,
        "content": base64.encode(JSON.stringify(content))
      });

      axios(config)
      .then(z => {
        yes(z.data)
      })
      .catch(no)
    }).catch(no)
  })
}

module.exports = { getShaFile, uploadNew }
