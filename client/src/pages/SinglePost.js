import React, { useContext, useState, useRef } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, Card, CardContent, Grid, Icon, Label, Image, Confirm, Form } from 'semantic-ui-react';
import moment from 'moment'
import LikeButton from '../LikeButton';
import { AuthContext } from '../context/auth'
import DeleteButton from '../DeleteButton';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'


function SinglePost(props){
    
    const navigate = useNavigate()
    const { postId }  = useParams()
    const commentInputRef = useRef(null)
    const [comment, setComment ] = useState('')
    
    console.log(postId)
    const { user } = useContext(AuthContext)
        const {data: getPosta} = useQuery(FETCH_POST_QUERY, {
            variables: {
                postId
            }
        })
    const [submitComment] = useMutation(SUBMIT_COMMENT,{
        update(){
            setComment('')
            commentInputRef.current.blur();

        },
        variables:{
            postId,
            body: comment

        }
    })
    function deleteButtonCallback(props){
        navigate('/')
        
    }
    let postMarkup;
    if(!getPosta){
        postMarkup = <p>loading post</p>
    } else{
        
        const { getPost } = getPosta
        console.log(getPost)
        const { id, username, createdat, body, commentCount, likes, likeCount, comments  } = getPost
        console.log(id)
        

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                         src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                         size="small"
                         float="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                    <Card fluid>
                        <CardContent>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdat).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </CardContent>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{id,likeCount,likes}} />
                            <Button
                                as='div'
                                labelposition='right'
                                onClick={()=> console.log('commment')} 
                                >
                                    <Button basic color='blue'>
                                        <Icon name='comments'/>
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>

                            </Button>
                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={deleteButtonCallback}/>
                            )}
                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <p> Post a comment</p>
                                <Form>
                                    <div className ="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder='comment'
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                    </div>
                                    <button type="submit"
                                        style = {{marginTop:10}}
                                        className='ui button purple'
                                        disabled = {comment.trim()=== ''}
                                        onClick = {submitComment}
                                    >
                                    Submit
                                    </button>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments.map(comment =>(
                        <Card fluid key={comment.id}>
                            <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id}/>
                                )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdat).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id body createdat username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdat body
            }
        }
    }
`
const SUBMIT_COMMENT = gql`
    mutation($postId: ID!,$body: String!){
        createComment(postId: $postId, body:$body){
            id
            comments{
                id body createdat username
            }
            commentCount
        }
    }
`
export default SinglePost