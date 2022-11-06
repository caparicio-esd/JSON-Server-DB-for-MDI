const { Comment } = require('./src/entities/Comments')
const { Db } = require('./src/entities/Db')
const { FollowRelation } = require('./src/entities/FollowRelation')
const { LikeRelation } = require('./src/entities/LikeRelation')
const { Post } = require('./src/entities/Post')
const { User } = require('./src/entities/User')

const main = () => {
    const users = User.createUsers()
    const posts = Post.createPosts(users)
    const comments = Comment.createComments(users, posts)
    const likes = LikeRelation.createLikeRelations(users, posts, comments)
    const follows = FollowRelation.createFollowRelations(users)
    const db = new Db({ users, posts, comments, likes, follows })
    db.persist()
}
main()
