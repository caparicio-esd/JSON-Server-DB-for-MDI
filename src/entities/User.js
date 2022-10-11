const { faker } = require('@faker-js/faker')
const { USERS_AMOUNT } = require('../constants')

class User {
  id = ''
  name = ''
  fName = ''
  dob = null
  sex = ''
  email = ''
  constructor(name, fName, dob, sex, email) {
    this.id = faker.datatype.uuid()
    this.name = name
    this.fName = fName
    this.dob = new Date(dob)
    this.sex = sex
    this.email = email
  }
}

const createUsers = () => {
  const users = []
  for (let i = 0; i < USERS_AMOUNT; i++) {
    const name = faker.name.firstName()
    const fName = faker.name.lastName()
    const dob = new Date(
      faker.date.between(
        '1960-01-01T00:00:00.000Z',
        '2001-01-01T00:00:00.000Z',
      ),
    )
    const sex = faker.datatype.boolean() ? 'male' : 'female'
    const email = faker.internet.email(name, fName).toLowerCase()
    users.push(new User(name, fName, dob, sex, email))
  }
  return users
}

exports = User
module.exports = {
  User,
  createUsers,
}
