import React from 'react';
import { Grid, Visibility } from 'semantic-ui-react';
import PostDetails from '../posts/PostDetails';
import { Element, Events, animateScroll as scroll, scroller } from 'react-scroll';
import PostPreview from '../posts/PostPreview';

import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Select a post to view',
      authorFirstName: '',
      authorLastName: '',
      content: '',
      createdAt: '',
      rating: 0,
      isDisabled: true,
      postId: '',
      comments: []
    }
  }

  onClickPost = (title, authorFirstName, authorLastName, content, createdAt, rating, postId) => {
    const firestore = getFirestore();
    document.getElementById('comment-textarea').style.visibility = "visible";
    document.getElementById('post-comment').style.visibility = "visible";
    document.getElementById('comments').style.visibility = "visible";

    firestore.collection('posts').doc(postId).get().then((doc) => {
      let comments = doc.data().comments;

      this.setState({
        comments: comments
      });
    })

    this.setState({
      title: title,
      authorFirstName: authorFirstName,
      authorLastName: authorLastName,
      content: content,
      createdAt: createdAt,
      rating: rating,
      isDisabled: false,
      postId: postId,
    });
  }

  render() {
    const { posts } = this.props;
    const post = this.state;
    return (
      <div id='space-home' className='ui container fluid'>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <article>
                <Element name="posts">
                  <div id="content" className="ui center aligned container">
                    {posts && posts.map(post => {
                      return (
                        <PostPreview key={post.id} post={post} onClickPost={this.onClickPost} />
                      )
                    })}
                  </div>
                </Element>
              </article>
            </Grid.Column>
            <Grid.Column>
              <Element name="details">
                <PostDetails post={post} />
              </Element>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'] }
  ])
)(Home)