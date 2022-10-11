const { writeFile } = require('fs/promises')
const { resolve } = require('path')

class Db {
  constructor({ user, comment }) {
    this.user = user
    this.comment = comment
  }
  async persist() {
    const json_data = JSON.stringify(this, null, 4)
    writeFile(resolve('./db.json'), json_data, {
      encoding: 'utf-8',
      flag: 'w',
    }).then(() => {
      console.log('data persisted')
    })
  }
}

module.exports = {
  Db,
}
