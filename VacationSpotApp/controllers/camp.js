const { Camp } = require('../models/camp.js')
const { Review } = require('../models/review.js')
const User = require('../models/user.js')
const { createCamps } = require('../seed/index.js')

const cloudinary = require('cloudinary').v2

//mapbox
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mbxClient({ accessToken: process.env.MY_ACCESS_TOKEN })
const geocodingClient = mbxGeocoding(baseClient);

const allCamps = async (req, res, next) => {
  // await Camp.Empty()
  // await Review.Empty()
  // await User.Empty()
  // await createCamps()
  let key = process.env.MY_ACCESS_TOKEN
  const camps = await Camp.find()
  res.render('allCamps', { camps, key })
}
const newCamp = async (req, res, next) => {
  const { camp } = req.body
  const { username } = req.user
  const { title, price, location, description } = camp
  const geoLocation = await geocodingClient.forwardGeocode({
    query: location,
    limit: 1
  })
    .send()
    .then(response => response.body.features[0].geometry);
  const image = req.files.map((f) => { return { filename: f.filename, url: f.path } })
  const see = await Camp.create({ author: username, title, price, location, geoLocation, description, image })
  req.flash('msg', 'Your Spot has been added')
  res.redirect('/yelpies')
}
const updateCamp = async (req, res, next) => {
  const { camp } = req.body
  const { title, price, location, description } = camp
  const geoLocation = await geocodingClient.forwardGeocode({
    query: location,
    limit: 1
  })
    .send()
    .then(response => response.body.features[0].geometry);
  const image = req.files.map((f) => { return { filename: f.filename, url: f.path } })
  let { id } = req.params
  await Camp.findByIdAndUpdate(id, { title, location, geoLocation, price, description, $push: { image: image } }, { new: true })
  req.flash('msg', 'Your Spot has been updated')
  res.redirect(`/yelpies/${id}`)
}
const deleteCamp = async (req, res, next) => {
  let { id } = req.params
  const camp = await Camp.findByIdAndDelete(id).populate('reviews')
  const deleteImg = camp.image.map(f => f.filename)
  cloudinary.uploader.destroy(deleteImg)
  await Review.deleteMany({ _id: { $in: camp.reviews } })
  req.flash('errMsg', 'DELETED')
  res.redirect('/yelpies')
}
const deleteCampImage = async (req, res, next) => {
  const { picName, path } = req.body
  const camp = await Camp.findByIdAndUpdate(path, { $pull: { image: { filename: picName } } })
  cloudinary.uploader.destroy(picName)
}
const newCampForm = (req, res) => {
  res.render('newcampForm')
}

const campDetails = async (req, res, next) => {
  let key = process.env.MY_ACCESS_TOKEN
  let { id } = req.params
  const camp = await Camp.findById(id).populate('reviews')
  res.render('campDetails', { camp, key })
}

const editCampForm = async (req, res, next) => {
  let { id } = req.params
  const camp = await Camp.findById(id)
  res.render('editcampForm', { id, camp })
}

exports.allCamps = allCamps
exports.newCamp = newCamp
exports.updateCamp = updateCamp
exports.deleteCamp = deleteCamp
exports.deleteCampImage = deleteCampImage
exports.newCampForm = newCampForm
exports.campDetails = campDetails
exports.editCampForm = editCampForm