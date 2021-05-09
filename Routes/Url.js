const router = require("express").Router()
const Url = require("../Model/Url")

router.route("/create").post(function (req, res) {
  const { body } = req
  try {
    let newUrl = new Url(body)
    newUrl
      .save()
      .then(response => {
        res.status(200).send({ sucess: "created" })
      })

      .catch(err => {
        res.status(400).send({ Error: err })
      })
  } catch (err) {
    res.status(400).send({ Error: err })
  }
})
router.route("/").delete((req, res) => {
  try {
    Url.deleteMany()
      .then(response => {
        console.log("delete", response)
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(400).send({ Error: err })
      })
  } catch (err) {
    res.status(400).send({ Error: err })
  }
})
router.route("/:id").get((req, res) => {
  const parentId = req.params.id

  try {
    Url.find({ folderId: parentId })
      .then(response => {
        if (response.length === 0) res.status(200).send([])
        else res.status(200).json(response)
      })
      .catch(err => {
        res.status(400).send(`Error : ${err}`)
      })
  } catch (err) {
    res.status(400).send(`Error : ${err}`)
  }
})

module.exports = router
