const { createComments } = require('./src/entities/Comments')
const { Db } = require('./src/entities/Db')
const { createUsers } = require('./src/entities/User')

const main = () => {
  const users = createUsers()
  const comments = createComments(users)
  const db = new Db({ users, comments })
  db.persist()
}
main()
