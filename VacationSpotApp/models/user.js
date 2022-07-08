const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email:{type:String,required:true}
});
User.statics.Empty=async function (){
    await this.deleteMany({})
    console.log('emptied')
  }
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);