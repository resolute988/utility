const router= require("express").Router()
const svgCaptcha= require("svg-captcha")

router.get("/create",(req,res)=>{
    try {    var captcha = svgCaptcha.create({
        size: 6,
        noise:0,
        charPreset:'0123456789',
      });
      req.session.captcha = captcha.text;

      console.log("captcha generate",req.session.captcha)
    res.type('svg');
    res.status(200).send(captcha.data);
        
    } catch (error) {
        res.status(400).send({err:error})
    }
  
})

router.post("/verify",(req,res)=>{
   try {
    const captcha= req.body.captcha
console.log("captcha verify ",captcha,req.session.captcha)

    if(captcha===req.session.captcha)
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