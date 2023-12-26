var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const newSchema = new Schema({
    fullName: { type: String },
    email:{type:String, unique:true, required:true},
    password: { type: String, required: true, trim: true }
}, {
    timestamps: true
})
const User =  mongoose.model('User', newSchema);
module.exports = User;