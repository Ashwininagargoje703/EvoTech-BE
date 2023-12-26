var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const newSchema = new Schema({
    title: { type: String },
    userId: {type :   Schema.Types.ObjectId, required : true},
    imageUrl:{type:String },
    description: { type: String }
}, {
    timestamps: true
})
const Form =  mongoose.model('forms', newSchema);
module.exports = Form;