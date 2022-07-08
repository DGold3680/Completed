const mongoose=require('mongoose')
const {Schema,model}=mongoose


const imageSchema=new Schema({
  url:String,
  filename:String
})

const campSchema=new Schema({
    author:{type:String,required:true},
    title:{type:String,required:true},
    location:{type:String,required:true},
    geoLocation: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    price:{type:Number,required:true},
    description:{type:String,required:true},
    image:[imageSchema],
    reviews:[{type:Schema.Types.ObjectId,ref:'Review'}]
})

 // location:{}
campSchema.statics.Empty=async function (){
  await this.deleteMany({})
  console.log('emptied')
}

const Camp=model('Camp',campSchema)

exports.Camp=Camp

