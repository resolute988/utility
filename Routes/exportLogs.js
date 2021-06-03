const router= require("express").Router()
const CreditorDetails = require("../Model/CreditorDetails")


router.post("/",(req,res)=>{
try{
    const {rp_id,rootFolderId}= req.body
    CreditorDetails.find(
        {rp_id,rootFolderId},
        {creditor:1,first_name:1,last_name:1,email_id:1,phone_number:1,amount_claimed:1,amount_admitted:1,creditor_claim:1,_id:0}
        ).then(response=>{
        var d_response=[]

        response.map(obj=>{
            var {creditor,first_name,last_name,email_id,phone_number,amount_claimed,amount_admitted,creditor_claim}=obj
            first_name+=" "+last_name
           d_response.push({'Co. Name' :creditor,'Name of the Person':first_name,'Email':email_id,'Mobile':phone_number,'Total Claim':amount_claimed,'Creditor Type':creditor_claim}) 
        })

        res.status(200).send({response:d_response})
    }).catch(err=>console.log("err ",err))

} catch (error) {
        res.status(400).send({err:error})
    }
  
})

module.exports= router