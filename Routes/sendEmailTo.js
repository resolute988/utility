const router= require("express").Router()
const nodemailer= require("nodemailer");


router.post("/claimant",(req,res)=>{
    try { 
      if(req.body.email!==undefined)
      {
      console.log("body",req.body)
        const email= req.body.email
   
      const subject=`Claim Filed Before NAMEXXXXXXX on DATE XXXX claimant `
      const html=`Welcome to Resolute, <br/>
      You claim has been successfully filed on datexxxxxxxx timexxxxxx before name xxxxxxxxxxxxxxxxx with the following attachments :  <br/>
      1. <br/> 
      2. <br/> 
      3. <br/> 
      4. <br/> 
      
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
    html: html 
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
  try { 
    if(req.body.email!==undefined)
    {
    console.log("body",req.body)
      const email= req.body.email
 
    const subject=`Claim Filed Before NAMEXXXXXXX on DATE XXXX  RP`
    const html=`Welcome to Resolute, <br/>
    You claim has been successfully filed on datexxxxxxxx timexxxxxx before name xxxxxxxxxxxxxxxxx with the following attachments :  <br/>
    1. <br/> 
    2. <br/> 
    3. <br/> 
    4. <br/> 
    
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