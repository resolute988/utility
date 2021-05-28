const router=require("express").Router()
var TinyURL = require('tinyurl');
 
router.route("/").get((req,res)=>{
try {

    const query= req.query
    const _longUrl=query.url
   console.log("welcome ",_longUrl)

    TinyURL.shorten(_longUrl, function(response, err) {
      if (err)
        {console.log(err)}

                res.status(200).send({url:response})
    });


} catch (error) {
    console.log("error ",error)    
res.status(400).send({url:"error"})
}

})
module.exports= router