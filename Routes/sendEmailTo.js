const router= require("express").Router()
const nodemailer= require("nodemailer");

const sendEmail= (email,subject,html,feedback)=>{
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  var mailOptions = {
    from: 'resolute988@gmail.com',
    to: obj.email,
    subject: subject,
    html: html 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
       feedback.push(info)
    }
  });

}
router.post("/",(req,res)=>{
var feedback=[]
    try { 
        console.log("body",req.body)
        const obj= req.body
      
      const claimant_subject=`Claim Filed Before NAMEXXXXXXX on DATE XXXX  `
      const claimant_html=`Welcome to Resolute, <br/>
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
      
        sendEmailTo(obj.claimant_email,subject,html,feedback)
        const rp_subject=`Claim Filed Before NAMEXXXXXXX on DATE XXXX  `
        const rp_html=`Welcome to Resolute, <br/>
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
       
        sendEmailTo(obj.rp_email,subject,html,feedback)
        res.status(200).send(feedback)
    } catch (error) {
        res.status(400).send({err:error})
    }
  
})

module.exports= router