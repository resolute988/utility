const router = require("express").Router()
const FileDetails = require("../Model/FileDetails")

router.route("/create").post(function (req, res) {
  const { body } = req
  console.log(body)
  try {
    FileDetails.collection.insertMany(body, (err, response) => {
      if (err) {
        console.error(err)
        res.status(400).send({ Error: err })
      } else {
        console.log("Multiple documents inserted to Collection")
        res.status(200).send(response)
      }
    })
  } catch (err) {
    res.status(400).send({ Error: err })
  }
})

module.exports = router
