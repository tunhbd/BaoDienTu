const registerMiddleware = server => {
  server.use((req, res) => {
    if (req.error) {
      res.render('others/errorNotify', {
        data: {
          backLink: req.headers.referer ? req.headers.referer : '/'
        },
        layout: false
      })
    }
    else {
      res.render('others/notFound', { layout: false })
    }
  })
}

module.exports = {
  registerMiddleware,
}