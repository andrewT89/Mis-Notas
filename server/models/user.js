import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
})

UserSchema.plugin(uniqueValidator) // Validator field schema

export default mongoose.model('User', UserSchema)