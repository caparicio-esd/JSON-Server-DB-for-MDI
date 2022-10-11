const { faker } = require('@faker-js/faker')
const { COMMENTS_AMOUNT } = require('../constants')

class Comment {
  id = ''
  date = null
  parent = null
  text = ''
  user = ''
  constructor({ id, user, text, date, parent }) {
    this.id = id
    this.userId = user
    this.text = text
    this.date = new Date(date)
    this.parent = parent || null
  }
}

const createComments = (users) => {
  const usersIds = users.map((user) => user.id)
  const comments = []
  for (let i = 0; i < COMMENTS_AMOUNT; i++) {
    const id = faker.datatype.uuid()
    const currentParents = comments.map((comment) => comment.id)
    const parent = faker.helpers.maybe(
      () => faker.helpers.arrayElement(currentParents),
      0.6,
    )
    const user = faker.helpers.arrayElement(usersIds)
    const currentParent = comments.find((comment) => comment.id == parent)
    const date = currentParent
      ? faker.date.between(currentParent.date, new Date().toISOString())
      : faker.date.past(1)
    const text = faker.lorem.lines(faker.datatype.number({
        min: 1, 
        max: 4
    }))
    comments.push(
      new Comment({
        id,
        user,
        text,
        date,
        parent,
      }),
    )
  }
  return comments
}

module.exports = {
  Comment,
  createComments,
}
