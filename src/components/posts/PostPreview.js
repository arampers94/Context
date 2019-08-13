import React, { Component } from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateRating } from '../../store/actions/postActions';
import { Redirect } from 'react-router-dom';

// Renders state of home page; listens for changes to 'Home' component
class PostPreview extends Component {
  state = {
    showRating: false,
    thumbsUpColor: 'grey',
    thumbsDownColor: 'grey',
    redirect: false
  }

  renderRedirectToSignIn = () => {
    if (this.state.redirect) {
      return <Redirect to='/signin' />
    }
  }

  // Passes post info to 'PostDetails' component
  onClickPost = () => {
    console.log('Post clicked');
    const { onClickPost, post } = this.props;

    console.log('POST PREVIEW ');
    console.log(post);

    const title = post.title;
    const authorFirstName = post.authorFirstName;
    const authorLastName = post.authorLastName;
    const content = post.content;
    const createdAt = post.createdAt;
    const rating = post.rating;
    const postId = post.id;

    // Method given by 'Home' component is called with post info, changing state of 'Home' and causing
    // 'PostDetails' to re-render
    onClickPost(title, authorFirstName, authorLastName, content, createdAt, rating, postId);
  }

  handleClick = (e) => {
    e.preventDefault();
    const { thumbsUpColor, thumbsDownColor } = this.state;
    const { post, update, auth } = this.props;
    const id = post.id;
    const rating = post.rating;

    // If user is not logged in, redirect to sign in page
    if (!auth.uid) {
      this.setState({
        redirect: true
      })
    }

    if (e.target.id === 'thumbs-up') {
      if (thumbsUpColor === 'grey') {
        // Like post
        this.setState({
          thumbsUpColor: 'blue',
          showRating: true
        })
        update(id, rating, 1);
      } else {
        // Undo like
        this.setState({
          thumbsUpColor: 'grey',
          showRating: false
        })
        update(id, rating, -1);
      }
      if (thumbsDownColor !== 'grey') {
        // Switch from dislike to like
        this.setState({
          thumbsDownColor: 'grey'
        })
        update(id, rating, 2);
      }
    } else {
      if (thumbsDownColor === 'grey') {
        // Dislike post
        this.setState({
          thumbsDownColor: 'red',
          showRating: true
        })
        update(id, rating, -1);
      } else {
        // Undo dislike
        this.setState({
          thumbsDownColor: 'grey',
          showRating: false
        })
        update(id, rating, 1);
      }
      // Switch from like to dislike
      if (thumbsUpColor !== 'grey') {
        this.setState({
          thumbsUpColor: 'grey'
        })
        update(id, rating, -2);
      }
    }
  }

  render() {
    const { post } = this.props;
    const { showRating, thumbsUpColor, thumbsDownColor } = this.state;
    const rating = post.rating;
    const votes = showRating === true ? rating : 'Hidden';
    const extra = (
      <Grid columns={4} divided>
        <Grid.Row>
          <Grid.Column>
            <Icon id='thumbs-up' color={thumbsUpColor} onClick={this.handleClick} name='thumbs up outline' />
          </Grid.Column>
          <Grid.Column>
            <Icon id='thumbs-down' color={thumbsDownColor} onClick={this.handleClick} name='thumbs down outline' />
          </Grid.Column>
          <Grid.Column>
            <Icon name='comment outline' />
          </Grid.Column>
          <Grid.Column>
            <span>{votes}</span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

    const title = post.title;
    const author = "By: " + post.authorFirstName + " " + post.authorLastName;
    const content = post.content;
    return (
      <div id='preview'>
        {this.renderRedirectToSignIn()}
        <Card
          fluid
          color='red'
          header={title}
          meta={author}
          description={content}
          extra={extra}
          onClick={this.onClickPost}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    update: (postId, postRating, updateAmount) => (
      dispatch(updateRating(postId, postRating, updateAmount))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);