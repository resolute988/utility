const router= require("express").Router()
const CreditorDetails = require("../Model/CreditorDetails")


router.post("/",(req,res)=>{
try{
    const {rp_id,rootFolderId}= req.body
    CreditorDetails.find(
        {rp_id,rootFolderId},
        {creditor:1,first_name:1,last_name:1,email_id:1,phone_number:1,amount_claimed:1,amount_admitted:1,_id:0}
        ).then(response=>{
        var d_response=[]

        response.map(obj=>{
            var {creditor,first_name,last_name,email_id,phone_number,amount_claimed,amount_admitted}=obj
            first_name+=" "+last_name
           d_response.push({creditor,first_name,email_id,phone_number,amount_claimed,amount_admitted}) 
        })

        res.status(200).send({response:d_response})
    }).catch(err=>console.log("err ",err))

} catch (error) {
        res.status(400).send({err:error})
    }
  
})

module.exports= router