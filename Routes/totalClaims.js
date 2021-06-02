const router= require('express').Router()
const CreditorDetails = require("../Model/CreditorDetails")

router.route("/").post(function (req, res) {
    const {rp_id,rootFolderId} = req.body
    console.log("RP userId and Company folder Id ", req.body)
    try {
      CreditorDetails.aggregate(
        [
      { "$facet": {
         "operational_claim": [
             { "$match": {"rp_id":rp_id,"rootFolderId":rootFolderId,"creditor_claim":"operational"
     }},
             { "$count": "operational_claim" }
         ],
         "financial_claim": [
             { "$match": {"rp_id":rp_id,"rootFolderId":rootFolderId,"creditor_claim":"financial"
     }},
             { "$count": "financial_claim" }
         ]
     
       }}
       ])
        .then(response => {
        const operational_claim=response[0].operational_claim[0]?.operational_claim || 0
        const financial_claim=response[0].financial_claim[0]?.financial_claim     || 0
          
        res.status(200).send({operational_claim,financial_claim})
        })
        .catch(err => {
          res.status(400).send({ Error: err })
        })
    } catch (err) {
      res.status(400).send({ Error: err })
    }
  })
  
  module.exports = router
  