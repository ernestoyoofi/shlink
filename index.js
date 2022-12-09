const git = require("./lib/github")
const app = require("express")()
const bodyParser = require("body-parser")

app.get("/:id", (req, res) => {
  const qrw = req.params.id
  git.getShaFile().then(z => {
    const getId = z.content.map(z => (z.id)).indexOf(qrw)
    if(getId != -1) {
      res.redirect(z.content[getId].url)
    } else {
      res.send("Id not found !")
    }
  })
})

app.post("/api-urls", bodyParser.json(), (req, res) => {
  const id = require("crypto").randomBytes(8).toString('hex')
  const url = req.body.url
  const scrserver = req.secure === "https"? "https://" : "http://"
  const originserver = scrserver + req.get('host') + "/" + id
  if(!url) {
    res.status(400).send({ msg: "Please put body url in type content json !" })
  } else {
    if(url.match("http")) {
      git.uploadNew(id, url).then(z => {
        res.status(200).send({ msg: "Ok", data: originserver })
      })
    } else {
      res.status(400).send({ msg: "Type link with https:// or http:// !" })
    }
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running")
})
