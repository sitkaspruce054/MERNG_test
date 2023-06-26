import React, { useState, useEffect} from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { useMutation, gql } from '@apollo/client'


function LikeButton({ user, post: { id, likeCount, likes}}){
    console.log(user)
    const [liked, setLiked] = useState(false)
    useEffect(()=> {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

const  [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
});
const likeButton = user ? (
    liked ? (
        <Button color='purple'>
            <Icon name='heart'/>
        </Button>
        ) : (
            <Button color='purple' basic>
                <Icon name='heart'/>
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' color='purple' basic>
            <Icon name='heart'/>
        </Button>

    )
    

return(
    <Button as='div' labelPosition='right' onClick={likePost}>
       {likeButton}
        <Label as='a' basic color='purple' pointing='left'>
            {likeCount}
        </Label>
        </Button>
)
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`
export default LikeButton