import React, { Component } from 'react';
import PostPreview from '../posts/PostPreview';


class Feed extends Component {

  onClickPost = (title, authorFirstName, authorLastName, content, createdAt, rating) => {
    const { onClickPost } = this.props;
    onClickPost(title, authorFirstName, authorLastName, content, createdAt, rating);
    // console.log('Feed component method invoked');
  }

  render() {
    const { posts } = this.props;
    return (
      <div id="content" className="ui center aligned container">
        {posts && posts.map(post => {
          console.log(post);
          return (
            <PostPreview key={post.id} post={post} onClickPost={this.onClickPost} />
          )
        })}
      </div>
    )
  }
}

export default Feed;