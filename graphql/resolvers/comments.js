

const { UserInputError, AuthenticationError } = require('apollo-server');
const checkAuth = require('../../util/check-auth')

const Post = require('../../models/Post')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }
            const post = await Post.findById(postId);

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdat: new Date().toISOString()
                });
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(_, { postId, commentId}, context){
            console.log('testing')
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId)

                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex,1);
                    await post.save()
                    return post;
                } else {
                    throw new AuthenticationError('Action not Allowed');
                    // we dont return anything since the client will never be able to do this
                }


            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
};