const mongoose = require("mongoose")
const Schema = mongoose.Schema

let CreditorDetails = new Schema(
  {
    creditor: { type: String },
    amount_claimed: { type: Number },
    amount_admitted: { type: Number },
    rp_id: { type: String },
    rp_name: { type: String },
    rp_email: { type: String },
    folderId: { type: String },
    creditor_claim: { type: String },
    email_id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    phone_number: { type: String },
    registration_number: { type: String },
    resolution_professional: { type: String },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("CreditorDetails", CreditorDetails)
