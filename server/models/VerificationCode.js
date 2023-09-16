import { Schema, model } from "mongoose"

const VerificationCodeSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  verificationCode: {
    type: Number,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
})

export default model('verification_code', VerificationCodeSchema)