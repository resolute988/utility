const mongoose = require("mongoose")
const Schema = mongoose.Schema

let CreditorDetails = new Schema(
  {
    creditor: { type: String, unique: true },
    creditor_claim: { type: String },
    email_id: { type: String, unique: true },
    first_name: { type: String },
    form_name: { type: String },
    last_name: { type: String },
    phone_number: { type: String, unique: true },
    registration_number: { type: String },
    resolution_professional: { type: String },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("CreditorDetails", CreditorDetails)
