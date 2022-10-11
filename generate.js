const { createComments } = require('./src/entities/Comments')
const { Db } = require('./src/entities/Db')
const { createUsers } = require('./src/entities/User')

const main = () => {
  const user = createUsers()
  const comment = createComments(user)
  const db = new Db({ user, comment })
  db.persist()
}
main()
