console.clear()
const cors = require("cors")
const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
const app = express()
const FileDetails = require("./Routes/FileDetails")
const CreditorDetails = require("./Routes/CreditorDetails")

app.use(express.json())
app.use(cors())

app.use("/creditordetails", CreditorDetails)
app.use("/filedetails", FileDetails)

mongoose.connect(process.env.ATLAS_MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once("open", () => {
  console.log("connection established")
})

app.listen(PORT, function () {
  console.log(`Server is running on Port : http://localhost:${PORT}`)
})