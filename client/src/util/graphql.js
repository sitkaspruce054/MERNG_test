
import { gql } from '@apollo/client'


export const FETCH_POSTS_QUERY = gql`
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