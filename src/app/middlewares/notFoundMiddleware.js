const registerMiddleware = server => {
  server.use((req, res) => {
    res.render('notFound', { layout: false })
  })
}

module.exports = {
  registerMiddleware,
}