const { faker } = require('@faker-js/faker')
const { COMMENTS_AMOUNT } = require('../constants')
const { EditionEntity } = require('./EditionEntity')

class Comment extends EditionEntity {
    id = ''
    date = null
    postId = null
    parent = null
    text = ''
    userId = ''
    constructor({ id, user, text, date, postId, parent }) {
        super()
        this.id = id
        this.userId = user
        this.text = text
        this.date = new Date(date)
        this.postId = postId
        this.parent = parent || null
    }

    static createComments(users, posts) {
        const usersIds = users.map(user => user.id)
        const postIds = posts.map(post => post.id)
        const comments = []
        for (let i = 0; i < COMMENTS_AMOUNT; i++) {
            const id = faker.datatype.uuid()
            const currentParents = comments.map(comment => comment.id)
            const postId = faker.helpers.arrayElement(postIds)
            const parent = faker.helpers.maybe(
                () => faker.helpers.arrayElement(currentParents),
                0.6
            )
            const user = faker.helpers.arrayElement(usersIds)
            const currentParent = comments.find(comment => comment.id == parent)
            const currentPost = posts.find(post => post.id == postId)
            const date = currentParent
                ? faker.date.between(
                      currentParent.date,
                      new Date().toISOString()
                  )
                : faker.date.between(currentPost, new Date().toISOString())
            const text = faker.lorem.lines(
                faker.datatype.number({
                    min: 1,
                    max: 4,
                })
            )
            comments.push(
                new Comment({
                    id,
                    user,
                    text,
                    date,
                    parent,
                    postId,
                })
            )
        }
        return comments
    }
}
module.exports = {
    Comment,
}
