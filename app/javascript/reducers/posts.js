import keyBy from 'lodash/keyBy'
import { FETCH_POSTS_SUCCESS, CREATE_POST_SUCCESS } from '../actions/posts'

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, ...keyBy(action.records, 'id') }
    case CREATE_POST_SUCCESS:
      const post = action.record
      return { ...state, [post.id]: post }
    default:
      return state
  }
}
