import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Form from './Form'
import PostRow from './PostRow'

import { fetchPosts, createPost } from '../actions/posts'
import { getPosts } from '../selectors/posts'

class BlogContainer extends Component {
  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = () => {
    const { dispatch } = this.props
    dispatch(fetchPosts())
  }

  handlePostSubmit = (post) => {
    const { dispatch } = this.props
    dispatch(createPost(post))
  }

  render () {
    return (
      <div>
        <h1>Blogger</h1>
        <br/>

        <Form onSubmit={this.handlePostSubmit} getAllPosts={this.getAllPosts} />
        <br/>

        {this.props.posts.map((post, index) => (
          <PostRow
            post={console.log('my post', post) || post}
            key={index}
            getAllPosts={this.getAllPosts}
          />
        ))}
      </div>
    )
  }
}

BlogContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => ({
  posts: getPosts(state) || []
})

export default connect(mapStateToProps)(BlogContainer)
