const notFound = (req, res) => {
    res.status(404).send('Page not found')
  }

const errorred = (err, req, res, next) => {
    if (err.details) {
      const { details } = err
      const { message } = details[0]
      console.log(err, 'err middleware');
      res.status(400).redirect('/yelpies')
    }
    else {
      console.log(err)
      res.redirect('/yelpies')
    }
  }

exports.notFound=notFound
exports.errorred=errorred