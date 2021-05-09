const mongoose = require("mongoose")
const Schema = mongoose.Schema

let newUrl = new Schema(
  {
    folderId: { type: Number, unique: true },
    folderNM: { type: String },
    url: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("urls", newUrl)
