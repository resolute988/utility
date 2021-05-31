const router= require("express").Router()
const nodemailer= require("nodemailer")
const generateOTP= ()=>{
    const digitsAllowed= ['0','1','2','3','4','5','6','7','8','9']
    var otp=''
    for (let index = 0; index < 4; index++) {
    otp+= digitsAllowed[(Math.random().toFixed(1)*10) % 10]
    }
    return otp
  
  }
router.post("/create",(req,res)=>{
    try { 
      const gmail_id= req.body.gmail_id  
        var otp=generateOTP()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
          var mailOptions = {
            from: 'resolute988@gmail.com',
            to: gmail_id,
            subject: 'DCirrus sent you a verification key',
            html: `Dear User, <br/>
            ${otp} is your One Time Password as requested online, this OTP is valid for next 60 seconds.
            Please enter this OTP to proceed further.
            <h1 style="text-align: center;
            font-family: 'Google Sans';
            font-size: 40px;">${otp}</h1>
          
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
                req.session.otp= otp;
                console.log("otp generate",req.session.otp)
                res.status(200).send({response:true});
            }
          });
        
    } catch (error) {
        res.status(400).send({err:error})
    }
  
})

router.post("/verify",(req,res)=>{
   try {
    const otp= req.body.otp
    console.log("otp verify ",otp,req.session.otp)
    if( otp===req.session.otp)
    {
        res.status(200).send({response:true})
    }else{
        res.status(200).send({response:false})
    }
       
   } catch (error) {
       res.status(400).send({err:error})
   }

})

module.exports= router