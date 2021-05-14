const mongoose = require("mongoose")
const Schema = mongoose.Schema

let newUrl = new Schema(
  {
    creditorId: { type: String },
    formName: { type: String },
    folderId: { type: String },
    fileName: { type: String },
    fileSize: { type: Number },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("fileDetails", newUrl)
