import React from 'react'

import { Button,Form } from 'semantic-ui-react'

import { useForm } from './util/hooks'
import { gql, useMutation} from '@apollo/client'

function PostForm(){

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(proxy,result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            
            
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
                getPosts: [result.data.createPost,...data.getPosts],
            }})
            values.body = '';
        },
        onError(err){
            return err;
        }
    })

    function createPostCallback(){
        createPost();
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create A Post: </h2>
                <Form.Field>
                    <Form.Input
                        placeholder="hello"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true: false}
                    />
                    <Button type="submit" color="purple">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className ='ui error message'>
                    <ul className='list'>
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdat username
        likes{
            id username createdat
        }
        likeCount
        comments{
             body username createdat
        }
        commentCount
    }

}
`

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
export default PostForm

