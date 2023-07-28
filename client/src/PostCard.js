import React, { useContext } from 'react'
import { Card, Icon, Label, Image, Button, Confirm } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from './context/auth';
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton.js'
import './App.css'
function PostCard({ post: { body, createdat, id, username, likeCount, commentCount, likes }}){
    const { user } = useContext(AuthContext);
        
        
    return(
        <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://i.kym-cdn.com/entries/icons/original/000/025/999/Screen_Shot_2018-04-24_at_1.33.44_PM.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdat).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount}}/>

        <Button  labelPosition='right' as={Link} to={`/posts/${id}`}>
        <Button className='button' basic>
            <Icon name='comment' />  
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
            {commentCount}
        </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}

      </Card.Content>
    </Card>

    )
}

export default PostCard