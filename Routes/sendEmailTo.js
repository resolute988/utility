const router= require("express").Router()
const nodemailer= require("nodemailer");
const dateFormat= require("dateformat")

const getDate= ()=>{
  return dateFormat(new Date(), "dS mmmm, yyyy ")
}
const getTime= ()=>{
  return dateFormat(new Date(), " h:MM:ss TT ")
}

router.post("/claimant",(req,res)=>{
    try {
  console.log("claimant body",req.files,req.body)
      if(req.body.email!==undefined)
      {
        const email= req.body.email
        const rp_name= req.body.rp_name
        var files=[]

         req.files.file.map(obj=>{
           files.push({filename:obj.name,content:new Buffer.from(obj.data)})
         })

      const subject=`Claim Filed Before ${rp_name} on ${getDate()}  `
      const html=`Welcome to Resolute, <br/>
      You claim has been successfully filed on ${getDate()} ${getTime()} by ${rp_name} with the following attachments :  <br/>
      <br /> <br/>
      Thanks <br/>
      Team DCirrus <br/>
      For any further assistance, please contact your support team at support@dcirrus.com <br/>
      Do not respond to this email. This mailbox is not monitored. <br/>
      © Copyright 2021 DCirrus. All Rights Reserved. <br/>
      K 1/125 LGF, CR Park, New Delhi, 110019`
      
      
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  var mailOptions = {
    from: 'resolute988@gmail.com',
    to: email,
    subject:subject,
    html: html ,
    attachments: files
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
     console.log("email sent to claimant =>",info)
     res.status(200).send({response:true})
   
    }
  })
}else{
  res.status(400).send({error:"no recipients defined"})
}
    
      } catch (error) {
        res.status(400).send({err:error})
    }
  
})

router.post("/rp",(req,res)=>{
  console.log("Rp request body",req.body)
  try { 
    if(req.body.email!==undefined)
    {
    console.log("body",req.body)
      const email= req.body.email
      const claimant_name= req.body.claimant_name

      var list=''
       req.body.files.map((fileName,index)=>{
         list+=`${index+1}. ${fileName}  <br/>`
       })
 console.log("rp files",list)
    const subject=`Claim Filed Before ${rp_name} on ${getDate()}`
    const html=`Welcome, <br/>
    The Claim has been filed on ${getDate()} ${getTime()} by ${claimant_name} with the following documents :  <br/>
    <br/>  <br/> 
 
    ${list} <br/> 
    Thanks <br/>
    Team DCirrus <br/>
    For any further assistance, please contact your support team at support@dcirrus.com <br/>
    Do not respond to this email. This mailbox is not monitored. <br/>
    © Copyright 2021 DCirrus. All Rights Reserved. <br/>
    K 1/125 LGF, CR Park, New Delhi, 110019`
    
    
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: 'resolute988@gmail.com',
  to:email,
  subject: subject,
  html: html 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
   console.log("email sent to RP =>",info)
   res.status(200).send({response:true})
 
  }
})
}else{
res.status(400).send({error:"no recipients defined"})
}
  
    } catch (error) {
      res.status(400).send({err:error})
  }

})

module.exports= router