const User = require('../models/user.js')
const registerForm = (req, res) => {
    res.render('registerForm')
}

const register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const user = new User({ username, email })
        await user.setPassword(password);
        await user.save();
        req.login(user, function (err) {
            if (err) { return next(err); }
            req.flash('msg','Welcome to Yelpcamp!!')
            res.redirect('/yelpies')
        })
    } catch (e) {
        console.log(e)
        req.flash('errMsg', 'username or email already exists')
        res.redirect('/signup')
        next(e)
    }
}

const loginForm = (req, res) => {
    res.render('loginForm')
}

const login = async (req, res,next) => {
    await req.flash('msg', 'Welcome back')
    res.redirect('/yelpies')
}

const logout = (req, res) => {
    req.logout((err) => { if (err) { console.log(err) } })
    res.redirect('/yelpies')
}

exports.registerForm=registerForm
exports.register=register
exports.loginForm=loginForm
exports.login=login
exports.logout=logout