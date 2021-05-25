# execute this powershell script with one parameter which indicates comments
function gitPush($message){

  # it will build our project
  
 git add . 
 git commit -m $message 
 git push origin master  
 git push heroku master
 
}
  gitPush -message $args[0]
  