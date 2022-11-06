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

    static createFollowRelations(users) {}
}
module.exports = {
    FollowRelation,
}
