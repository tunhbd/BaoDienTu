const registerMiddleware = server => {
  server.use((req, res) => {
    res.render('others/notFound', { layout: false })
  })
}

module.exports = {
  registerMiddleware,
}