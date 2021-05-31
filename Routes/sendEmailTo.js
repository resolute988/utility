const router= require("express").Router()
const nodemailer= require("nodemailer")

router.post("/",(req,res)=>{
    try { 
        console.log("body",req.body)
      const obj= req.body
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });

          var mailOptions = {
            from: 'resolute988@gmail.com',
            to: obj.claimant,
            subject: 'Claim Filed Before NAMEXXXXXXX on DATE XXXX ',
            html: `Welcome to Resolute, <br/>
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
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                console.log("email sent ",info)
                res.status(200).send({response:info});
            }
          });
        
    } catch (error) {
        res.status(400).send({err:error})
    }
  
})

module.exports= router