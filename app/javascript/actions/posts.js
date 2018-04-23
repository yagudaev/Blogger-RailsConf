export const FETCH_POSTS_START = 'FETCH_POSTS_START'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const CREATE_POST_START = 'CREATE_POST_START'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'

export const fetchPosts = () => (dispatch) => {
  dispatch({ type: FETCH_POSTS_START })
  return fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
          query {
            posts {
              title
              content
              id
            }
          }
        `
    })
  }).then(response => {
    return response.json()
  }).then(response => {
    dispatch({ type: FETCH_POSTS_SUCCESS, records: response.data.posts })
  })
}

export const createPost = (post) => (dispatch) => {
  dispatch({ type: CREATE_POST_START })
  fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
          mutation {
            upsertPost(input: {
              title: "${post.title}"
              content: "${post.content}"
              id: "${post.id}"
            }) {
              post {
                id,
                title,
                content
              }
            }
          }
        `
    })
  }).then(response => {
    return response.json()
  }).then(response => {
    const record = response.data.upsertPost.post
    dispatch({ type: CREATE_POST_SUCCESS, record })
  })
}
