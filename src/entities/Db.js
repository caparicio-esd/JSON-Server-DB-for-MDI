const { writeFile } = require('fs/promises')
const { resolve } = require('path')

class Db {
    constructor({ users, comments, posts }) {
        this.users = users
        this.comments = comments
        this.posts = posts
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
