import React from 'react';
import { Grid } from 'semantic-ui-react';
import Feed from '../layout/Feed';
import PostDetails from '../posts/PostDetails';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends React.Component {
  state = {
    title: 'Click a post to view',
    authorFirstName: '',
    authorLastName: '',
    content: '',
    createdAt: '',
    rating: 0,
    isDisabled: true
  }

  onClickPost = (title, authorFirstName, authorLastName, content, createdAt, rating) => {
    // console.log('Home method invoked');
    this.setState({
      title: title,
      authorFirstName: authorFirstName,
      authorLastName: authorLastName,
      content: content,
      createdAt: createdAt,
      rating: rating,
      isDisabled: false
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
              <Feed posts={posts} onClickPost={this.onClickPost} />
            </Grid.Column>
            <Grid.Column>
              <PostDetails post={post} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('LOGGING STATE OF HOME PAGE');
  console.log(state);
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