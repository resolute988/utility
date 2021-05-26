# execute this powershell script with one parameter which indicates comments
function gitPush($message){
  
 git add . 
 git commit -m $message 
 git push origin master  
 
}
  gitPush -message $args[0]
  