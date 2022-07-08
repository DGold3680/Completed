const {campSchema,reviewSchema} = require('./joiSchemas')
const { Camp } = require('./models/camp.js')
const { Review } = require('./models/review.js')
//CUSTOM MIDDLEWARE
//try and catch utility
const wrapAsync=function(fn){
     return function(req,res,next){
          fn(req,res,next).catch(e=>console.log(e))}}

//JOi middleware
const validateCamp=async (req,res,next)=>{
try{const valid=await campSchema.validateAsync(req.body);
      next()}
catch(e){next(e)}}
const validateReview=async (req,res,next)=>{
    try{const valid=await reviewSchema.validateAsync(req.body);
          next()}
    catch(e){next(e)}}

//auth custom middleware
const isLoggedIn=(req,res,next)=>{
  if(req.isAuthenticated()){
    next()
  }else{res.redirect('/signup')}
}

const isAuthor=async (req,res,next)=>{
  let{id}=req.params
  const foundCamp=await Camp.findById(id)
 if(req.user.username!=foundCamp.author){
   req.flash('errMsg','you do not have permissiom to do that')
 res.redirect('/yelpies')}
 else{next()}
}

const isReviewAuthor=async(req,res,next)=>{
  let{q}=req.params
 const foundReview=await Review.findById(q)
 if(req.user.username!=foundReview.author){
   req.flash('errMsg','you do not have permissiom to do that')
 res.redirect('/yelpies')}
 else{next()}
}

//alternative for failureFlash which is not functional
const alert=(req,res,next)=>{
  req.flash('errMsg','incorrect username or password')
  next()
}

exports.wrapAsync=wrapAsync
exports.validateCamp=validateCamp
exports.validateReview=validateReview
exports.isLoggedIn=isLoggedIn
exports.isAuthor=isAuthor
exports.isReviewAuthor=isReviewAuthor
exports.alert=alert