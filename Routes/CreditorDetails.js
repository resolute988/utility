const router = require("express").Router()
const CreditorDetails = require("../Model/CreditorDetails")

router.route("/create").post(function (req, res) {
  const { body } = req

  try {
    let newCreditorDetails = new CreditorDetails(body)
    newCreditorDetails
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

module.exports = router
