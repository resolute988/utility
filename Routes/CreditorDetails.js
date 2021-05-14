const router = require("express").Router()
const CreditorDetails = require("../Model/CreditorDetails")

router.route("/create").post(function (req, res) {
  const { body } = req
  console.log(body)
  try {
    let newCreditorDetails = new CreditorDetails(body)

    newCreditorDetails
      .save()
      .then(response => {
        res.status(200).send(response)
      })

      .catch(err => {
        res.status(400).send({ Error: err })
      })
  } catch (err) {
    res.status(400).send({ Error: err })
  }
})
router.route("/").get(function (req, res) {
  const query = req.query
  console.log(query)
  try {
    CreditorDetails.findOne(query)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(err => {
        res.status(400).send({ Error: err })
      })
  } catch (err) {
    res.status(400).send({ Error: err })
  }
})

module.exports = router
