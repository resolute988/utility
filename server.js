console.clear()
console.log("\n")
const cors = require("cors")
const express = require("express")
const path = require("path")
require("dotenv").config()
const mongoose = require("mongoose")
const PORT = process.env.PORT
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express()
const FileDetails = require("./Routes/FileDetails")
const CreditorDetails = require("./Routes/CreditorDetails")
const shortUrl = require("./Routes/shortUrl")
const totalClaims= require("./Routes/totalClaims")
const captcha = require("./Routes/captcha")

const buildPath = path.join(__dirname + "/.."+"/dcirrus-front-end/build")

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.use(express.json())
app.use(cors())
app.use(express.static(buildPath))

app.use("/api/creditordetails", CreditorDetails)
app.use("/api/filedetails", FileDetails)
app.use('/api/urlshortener',shortUrl)
app.use("/api/totalclaims",totalClaims)
app.use("/api/captcha",captcha)

app.get("/*", (req, res) => {
  res.sendFile(path.join(buildPath, "/index.html"))
})
mongoose.connect(process.env.PRODUCTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const connection = mongoose.connection
connection.once("open", () => {
  console.log("connection established")
})

app.listen(PORT, function () {
  console.log(`Server is running on Port :${PORT}`)
})
