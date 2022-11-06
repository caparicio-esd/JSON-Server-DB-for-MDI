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
}

const createLikeRelations = (users, posts, comments) => {
    //
    return []
}

module.exports = {
    LikeRelation,
    createLikeRelations,
}
