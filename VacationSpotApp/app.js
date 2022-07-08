//DEPENDENCIES
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const engine = require('ejs-mate')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')
const helmet = require("helmet");

const app = express()
//heroku port
const port = process.env.PORT||3080

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.engine('ejs', engine)

//DATASTORES
//MongoDB

const url = process.env.mongo_url||'mongodb://localhost:27017/yelpies'
async function connect() { await mongoose.connect(url) }
connect().then(() => { console.log('mongo connected') }).catch(e => console.log(e, 'mongo not connected'))

//MongoDB sessions
const store = new MongoDBStore({
  uri: process.env.mongo_url,
  collection: 'mySessions'
}); store.on('error', function (error) {
  console.log(error);
});

//cloudinary image store
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'yelpies',
    allowedformats: ['png', 'jpeg', 'jpg'],
    unique_filename: true
  },
});
const maxSize = 1024 * 1024
const upload = multer({ storage, limits: maxSize });


//EXPRESS MIDDLEWARE
app.use(express.static(path.join(__dirname, '/publics')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.session_key,
  store,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(passport.initialize());
app.use(passport.session());
app.use(
  mongoSanitize({
  }),
);
//helmet security
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com",
  "https://api.tiles.mapbox.com",
  "https://api.mapbox.com",
  "https://kit.fontawesome.com",
  "https://cdnjs.cloudflare.com",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com",
  "https://stackpath.bootstrapcdn.com",
  "https://api.mapbox.com",
  "https://api.tiles.mapbox.com",
  "https://fonts.googleapis.com",
  "https://use.fontawesome.com",
];
const connectSrcUrls = [
  "https://api.mapbox.com",
  "https://*.tiles.mapbox.com",
  "https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          childSrc: ["blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/dxsfdeqjh/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com",
              "https://source.unsplash.com/random"
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);

//locals for templates
app.use((req, res, next) => {
  res.locals.msg = req.flash('msg');
  res.locals.errMsg = req.flash('errMsg')
  res.locals.signedIn = req.user
  next()
})

//Auth with passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//custom middleware
const { alert, wrapAsync, validateCamp, validateReview, isLoggedIn, isAuthor, isReviewAuthor } = require('./middleware')

///Routes
//home
app.get('/home',(req,res)=>{
  res.render('home')
})
//user
const { registerForm, register, loginForm, login, logout } = require('./controllers/user')
app.get('/signup', registerForm)
app.post('/signup', wrapAsync(register))
app.get('/signin', loginForm)
app.post('/signin',alert, passport.authenticate('local', {
  failureRedirect:'/signin',
  failureFlash:'username or password incorrect'
}), wrapAsync(login))
app.post('/signout', wrapAsync(logout))

//camps
const { allCamps, newCamp, updateCamp, deleteCamp, deleteCampImage, newCampForm, campDetails, editCampForm } = require('./controllers/camp')
app.get('/yelpies', wrapAsync(allCamps))
app.post('/yelpies', isLoggedIn, upload.array('image'), validateCamp, wrapAsync(newCamp))
app.patch('/yelpies/:id', isLoggedIn, isAuthor, upload.array('image'), validateCamp, wrapAsync(updateCamp))
app.delete('/yelpies/:id', isLoggedIn, isAuthor, wrapAsync(deleteCamp)) 
app.delete('/yelpies/image/delete', isLoggedIn, wrapAsync(deleteCampImage))
app.get('/yelpies/new', isLoggedIn, newCampForm)
app.get('/yelpies/:id',isLoggedIn, wrapAsync(campDetails))
app.get('/yelpies/:id/edit', isLoggedIn, wrapAsync(editCampForm))

//review routes
const{createReview,editReviewForm,deleteReview,updateReview}=require('./controllers/review')
app.post('/yelpies/:id/review', isLoggedIn, validateReview, wrapAsync(createReview))
app.get('/yelpies/:id/review/:q', isLoggedIn, isReviewAuthor, wrapAsync(editReviewForm))
app.delete('/yelpies/:id/review/:q', isLoggedIn, isReviewAuthor, wrapAsync(deleteReview))
app.patch('/yelpies/:id/review/:q', isLoggedIn, validateReview, wrapAsync(updateReview))

//error routes
const {notFound,errorred}=require('./controllers/errors')
app.use('/', notFound)
app.use(errorred)

app.listen(port, () => { console.log(`connected on ${port}`) })