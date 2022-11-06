const { faker } = require('@faker-js/faker')
const { FOLLOW_AMOUNT } = require('../constants')

class FollowRelation {
    followRelationId = ''
    userId = ''
    userFollowedId = ''
    date = null
    constructor({ followRelationId, userId, userFollowedId, date }) {
        this.followRelationId = followRelationId
        this.userId = userId
        this.userFollowedId = userFollowedId
        this.date = date
    }

    static createFollowRelations(users) {
        const follows = []
        const userIds = users.map(user => user.id)
        for (let i = 0; i < FOLLOW_AMOUNT; i++) {
            const followRelationId = faker.datatype.uuid()
            const userId = faker.helpers.arrayElement(userIds)
            const userFollowedId = faker.helpers.arrayElement(userIds)
            const date = faker.date.past(1)
            follows.push(
                new FollowRelation({
                    followRelationId,
                    userId,
                    userFollowedId,
                    date,
                })
            )
        }
        return follows
    }
}
module.exports = {
    FollowRelation,
}
