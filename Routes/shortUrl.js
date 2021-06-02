const router=require("express").Router()
var TinyURL = require('tinyurl');
 
router.route("/").post((req,res)=>{
try {
    const {url}= req.body
    const _longUrl=decodeURIComponent(url)
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