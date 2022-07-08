const mongoose=require('mongoose')
const {Schema,model}=mongoose


const reviewSchema=new Schema({
    msg:{type:String,required:true},
    author:{type:String,required:true},
    rating:{type:Number,required:true,min:1},
    image:String
  })


reviewSchema.statics.Empty=async function (){
    await this.deleteMany({})
    console.log("emptied")
  }

const Review=model('Review',reviewSchema)
exports.Review=Review