import React, { Component } from 'react'

export default class Form extends Component {
  constructor(props) {
    super(props)

    const post = props.post || {}

    this.state = {
      title: post.title || '',
      content: post.content || '',
      id: post.id || ''
    }
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const post = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    }
    console.log('log post', post)
    this.props.onSubmit(post)
    // immidately update, don't wait for server response, assume success
    this.setState({ title: '', content: '' })
    if (this.props.toggleEditMode) this.props.toggleEditMode()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <textarea
          name='content'
          placeholder='Write blog content here....'
          cols={100}
          rows={10}
          value={this.state.content}
          onChange={this.handleInputChange}
        />
        <button type='submit'>Save</button>
      </form>
    )
  }
}
