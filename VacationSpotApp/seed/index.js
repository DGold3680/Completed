
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const {usa}=require('./cities')
const {descriptors,places}=require('./seedHelpers')
const {Camp}=require('../models/camp')
const mongoose=require('mongoose')


//const url='mongodb://localhost:27017/yelpies'
const url=process.env.mongo_url
async function connect(){await mongoose.connect(url)}

connect().then(()=>{console.log('mongo connected')}).catch(e=>console.log(e,'mongo not connected'))

const random=(arr)=>{
   return Math.floor(Math.random()*arr.length)
}


let title=()=>{return descriptors[random(descriptors)]+' '+places[random(places)]}

async function createCamps(){try{
  for(let place of usa){
    await Camp.create(
    {author:'dd',location:place.city+' '+place.state,geoLocation:{type:'Point',
    coordinates:[place.longitude,place.latitude]}
,title:title(),image:[
      {url:'https://source.unsplash.com/random'
      ,filename:'random'}],
      price:random(places),
      description:'title is A wonderfulplace'})
 }
   const camps=await Camp.find({})
   console.log('db seeded')
   return camps
}catch(e){console.log(e,'seeding failed')}
}

exports.createCamps=createCamps