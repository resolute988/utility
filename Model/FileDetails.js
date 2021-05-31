const mongoose = require("mongoose")
const Schema = mongoose.Schema

let FileDetails = new Schema(
  {
    creditorId: { type: String },
    formName: { type: String },
    fileName: { type: String },
    fileSize: { type: Number },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("FileDetails", FileDetails)
