import React, { Component } from 'react';
import PostPreview from '../posts/PostPreview';


class Feed extends Component {

  // Passes post info to 'PostPreview' component
  onClickPost = (title, authorFirstName, authorLastName, content, createdAt, rating) => {
    const { onClickPost } = this.props;
    onClickPost(title, authorFirstName, authorLastName, content, createdAt, rating);
    // console.log('Feed component method invoked');
  }

  render() {
    const { posts } = this.props;
    return (
      <h1>hello</h1>
    )
  }
}

export default Feed;