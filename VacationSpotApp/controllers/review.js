const { Camp } = require('../models/camp.js')
const { Review } = require('../models/review.js')
const createReview = async (req, res, next) => {
  let { id } = req.params
  let { username } = req.user
  let { review } = req.body
  review.author = username
  const newReview = await Review.create(review)
  const { _id } = newReview
  await Camp.findByIdAndUpdate(id, { $push: { reviews: _id } }).populate('reviews')
  res.redirect(`/yelpies/${id}`)
}

const editReviewForm = async (req, res, next) => {
  let { id, q } = req.params
  const review = await Review.findById(q)
  res.render('editReviewForm', { id, q, review })
}

const deleteReview = async (req, res, next) => {
  let { id, q } = req.params
  await Camp.findByIdAndUpdate(id, { $pull: { reviews: q } })
  await Review.findByIdAndDelete(q)
  res.redirect(`/yelpies/${id}`)
}
const updateReview = async (req, res, next) => {
  let { id, q } = req.params
  let { review } = req.body
  const latest = await Review.findByIdAndUpdate(q, review, { new: true })
  res.redirect(`/yelpies/${id}`)
}

exports.createReview = createReview
exports.editReviewForm = editReviewForm
exports.deleteReview = deleteReview
exports.updateReview = updateReview