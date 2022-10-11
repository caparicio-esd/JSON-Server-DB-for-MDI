const authMiddleWare = (req, res, next) => {
  //
  const authHeader = req.headers['Authorization']
  if (!authHeader) {
    res.status(403).send({
      message: 'not authorized',
    })
    return
  }

  //
  if (!authHeader.includes('Bearer ') && !authHeader.indexOf('Bearer ') == 0) {
    res.status(403).send({
      message: 'auth protocol incorrect',
    })
    return
  }

  next()
}
module.exports = authMiddleWare
