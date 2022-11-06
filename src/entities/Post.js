const { faker } = require('@faker-js/faker')
const { POSTS_AMOUNT } = require('../constants')
const { EditionEntity } = require('./EditionEntity')

class Post extends EditionEntity {
    id = ''
    date = null
    text = ''
    userId = ''
    constructor({ id, user, text, date }) {
        super()
        this.id = id
        this.userId = user
        this.text = text
        this.date = new Date(date)
    }

    static createPosts(users) {
        const usersIds = users.map(user => user.id)
        const posts = []
        for (let i = 0; i < POSTS_AMOUNT; i++) {
            const id = faker.datatype.uuid()
            const user = faker.helpers.arrayElement(usersIds)
            const text = faker.lorem.lines(
                faker.datatype.number({
                    min: 3,
                    max: 20,
                })
            )
            const date = faker.date.past(1)
            posts.push(
                new Post({
                    id,
                    user,
                    text,
                    date,
                })
            )
        }
        return posts
    }
}

module.exports = {
    Post,
}
