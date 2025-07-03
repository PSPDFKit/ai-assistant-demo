var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var jwt = require('jsonwebtoken')
var jwtKey = fs.readFileSync(path.resolve(__dirname, '../config/pspdfkit/jwt.pem'))

router.get('/', function (_req, res, _next) {
  var aiJwt = prepareAIAssistantJwt()
  res.render('documents/show', { aiJwt: aiJwt })
})

const prepareAIAssistantJwt = function () {
  var claims = {}

  return jwt.sign(claims, jwtKey, {
    algorithm: 'RS256',
    expiresIn: 60 * 60, // 1hr, this will set the `exp` claim for us.
    allowInsecureKeySizes: true,
  })
}

module.exports = router
