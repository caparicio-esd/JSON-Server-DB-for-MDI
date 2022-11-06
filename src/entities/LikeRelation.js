const { faker } = require('@faker-js/faker')
const { LIKE_AMOUNT } = require('../constants')

class LikeRelation {
    likeRelationId = ''
    userId = ''
    editionEntityId = ''
    editionEntityType = ''
    date = null
    constructor({
        likeRelationId,
        userId,
        editionEntityId,
        editionEntityType,
        date,
    }) {
        this.likeRelationId = likeRelationId
        this.userId = userId
        this.editionEntityId = editionEntityId
        this.editionEntityType = editionEntityType
        this.date = date
    }

    static createLikeRelations(users, posts, comments) {
        const relations = []
        const userIds = users.map(user => user.id)
        const postIds = posts.map(post => post.id)
        const commentIds = comments.map(comment => comment.id)
        for (let i = 0; i < LIKE_AMOUNT; i++) {
            const likeRelationId = faker.datatype.uuid()
            const userId = faker.helpers.arrayElement(userIds)
            const editionEntityType = faker.datatype.boolean()
                ? 'post'
                : 'comment'
            const editionEntityId = 'post'
                ? faker.helpers.arrayElement(postIds)
                : faker.helpers.arrayElement(commentIds)
            const date = faker.date.past(1)
            relations.push(
                new LikeRelation({
                    likeRelationId,
                    userId,
                    editionEntityType,
                    editionEntityId,
                    date,
                })
            )
        }

        return relations
    }
}

module.exports = {
    LikeRelation,
}
