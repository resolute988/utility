const router = require("express").Router()
const FileDetails = require("../Model/FileDetails")

const isLastFile = (arr_1, arr_2) => {
  if (arr_1.length === arr_2.length) return true
  else return false
}
router.route("/create").post(function (req, response) {
  const { body } = req
  console.log("our fileDetails ", body)
  //  we have mulitple files so have to update it if not exist
  var feedback = []
  console.log("start")
  body.map((doc, index) => {
    try {
      // Setup stuff
      var query = {
        folderId: { $eq: doc.folderId },
        fileName: { $eq: doc.fileName },
      }
      var update = { fileSize: doc.fileSize }
      var options = { upsert: true }

      FileDetails.find(query, (err, fileResponse) => {
        if (err) {
          console.error(err)
          res.status(400).send({ Error: err })
        } else {
          if (fileResponse.length === 0) {
            var newFileDetails = new FileDetails(doc)
            newFileDetails
              .save()
              .then(res => {
                console.log("file response", res)
                feedback.push(res._id)
                //  if this is the last operation then we have to send the response with their ids
                if (isLastFile(body, feedback)) {
                  response.status(200).send(feedback)
                }
              })
              .catch(err => console.log("fileDetails creation error", err))
          } else {
            console.log("fileDetails document exist", fileResponse)
            const obj = fileResponse[0]

            FileDetails.updateOne(
              { _id: obj._id },
              {
                $set: { fileSize: doc.fileSize },
                $currentDate: { lastModified: true },
              }
            )
              .then(res => {
                console.log("filedetails modificaiton response", res)
                feedback.push(obj._id)
                //  if this is the last operation then we have to send the response with their ids

                if (isLastFile(body, feedback)) {
                  response.status(200).send(feedback)
                }
              })
              .catch(err => console.log("filedetails modificaiton error", err))
          }
        }
      })
    } catch (err) {
      response.status(400).send({ Error: err })
    }
  })
})

module.exports = router
