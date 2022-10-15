const express = require('express')
const authRouter = express.Router()
const { readFile, writeFile } = require('fs/promises')
const { resolve } = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')
const { User } = require('../entities/User')

authRouter.post('/signup', async (req, res) => {
  const { name, fName, dob, sex, email, password } = req.body
  const bodyDataAsArray = [name, fName, dob, sex, email, password]
  
  // 
  if (bodyDataAsArray.some(bd => bd === null)) {
    res.sendStatus(400)
    return
  }

  const user = new User({ name, fName, dob, sex, email, password })
  const dbUsers = JSON.parse(await readFile(resolve('./db.json')))
  dbUsers.users.push(user)
  await writeFile(
    resolve('./db.json'),
    JSON.stringify(dbUsers, null, 4),
    {
      flag: 'w',
    },
  )
  res.sendStatus(201)
})

authRouter.post('/logout', async (req, res) => {
  const headers = req.headers
  const requestOrigin = headers['x-application']

  //
  const token = headers.authorization.replace('Bearer ', '')
  const tokenData = jwt.decode(token, {
    json: true,
  })
  if (!tokenData) {
    res.sendStatus(403)
    return
  }

  //
  const dbTokens = JSON.parse(await readFile(resolve('./db_tokens.json')))
  const currentToken = dbTokens.find(
    (dbToken) =>
      dbToken.userId == tokenData.user &&
      dbToken.requestOrigin == requestOrigin,
  )
  if (!currentToken) {
    res.sendStatus(404)
    return
  }

  //
  const currentTokenIndex = dbTokens.indexOf(currentToken)
  dbTokens.splice(currentTokenIndex, 1)
  await writeFile(
    resolve('./db_tokens.json'),
    JSON.stringify(dbTokens, null, 4),
    {
      flag: 'w',
    },
  )

  res.sendStatus(200)
})

authRouter.post('/login', async (req, res) => {
  const { user, pass } = req.body
  const headers = req.headers
  const requestOrigin = headers['x-application']
  const userDBData = JSON.parse(await readFile(resolve('./db.json'))).users
  const userData = userDBData.find(
    (userDBDataItem) =>
      userDBDataItem.name == user || userDBDataItem.email == user,
  )

  // guard user
  if (!userData) {
    res.sendStatus(404)
    return
  }

  const checkPass = bcrypt.compareSync(pass, userData.hashedPassword)
  // guard pass
  if (!checkPass) {
    res.sendStatus(403)
    return
  }

  // create JWT
  let token
  const dbTokens = JSON.parse(await readFile(resolve('./db_tokens.json')))
  const currentToken = dbTokens.find(
    (dbToken) =>
      dbToken.userId == userData.id && dbToken.requestOrigin == requestOrigin,
  )
  if (!currentToken) {
    const iat = Math.floor(Date.now() / 1000) + 30
    token = jwt.sign({ user: userData.id, iat }, JWT_SECRET)
    dbTokens.push({
      userId: userData.id,
      token,
      requestOrigin,
      iat,
    })
    await writeFile(
      resolve('./db_tokens.json'),
      JSON.stringify(dbTokens, null, 4),
      {
        flag: 'w',
      },
    )
  } else {
    token = currentToken.token
  }

  res.jsonp({
    token,
  })
})

authRouter.use('*', (req, res) => {
  res.sendStatus(404)
})

module.exports = {
  authRouter,
}
