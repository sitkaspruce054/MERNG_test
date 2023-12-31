import React, { useContext } from 'react'
import { Grid, Transition, Confirm } from 'semantic-ui-react'
import { useQuery, gql } from '@apollo/client'
import PostCard from '../PostCard'
import { AuthContext } from '../context/auth'
import PostForm from '../PostForm.js'

 function Home() {
 const { user } = useContext(AuthContext)
  const { loading, data} = useQuery(FETCH_POSTS_QUERY)
  if(loading) return <h1> Loading...</h1>
  const{ getPosts: posts } = data
  
  
  
  return (
    <Grid columns={3}>
        <Grid.Row className="page-title">
      
            <h1> Recent Posts</h1>
      
      </Grid.Row>
     
       
      
    <Grid.Row>
       {user && (
        <Grid.Column>
            <PostForm/>
        </Grid.Column>
       )}
       {loading ? (
        <h1>Loading Posts...</h1>
       ) : (
        <Transition.Group>
            {posts && posts.map(post => (
                <Grid.Column key={post.id} style={{marginBottom: 20}}>
                    <PostCard post={post}/>
            </Grid.Column>
            ))}
        </Transition.Group>
       )}
      
    </Grid.Row>
    </Grid>
    
  )
}

const FETCH_POSTS_QUERY = gql`
     {
          getPosts {
            id
            body
            createdat
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                body
                createdat
            }
            

            
            
            
            
            
                

            
        }
    }

`;




export default Home;