const { Comment } = require('./src/entities/Comments')
const { Db } = require('./src/entities/Db')
const { Post } = require('./src/entities/Post')
const { User } = require('./src/entities/User')

const main = () => {
    const users = User.createUsers()
    const posts = Post.createPosts(users)
    const comments = Comment.createComments(users, posts)
    const likes = []
    const follows = []
    const db = new Db({ users, posts, comments })
    db.persist()
}
main()
