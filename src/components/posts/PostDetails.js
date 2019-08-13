import React, { Component } from 'react';
import { Card, Form, Button, Feed, Header } from 'semantic-ui-react';
import PostComments from './PostComments';
import { connect } from 'react-redux';
import { postComment } from '../../store/actions/commentActions';
import { Redirect } from 'react-router-dom';

// Receives props from 'PostPreview' and displays them with more details
class PostDetails extends Component {
  state = {
    post: this.props.post,
    comment: '',
    isDisabled: true,
    redirect: false,
    comments: this.props.comments
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      post: nextProps.post,
      isDisabled: nextProps.post.isDisabled
    });
  }

  renderRedirectToSignIn = () => {
    if (this.state.redirect) {
      return <Redirect to='/signin' />
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // Post comment to firebase
  handleClick = (e) => {
    e.preventDefault();
    const { comment, post } = this.state;
    const { postComment, auth, profile } = this.props;
    const postId = post.postId;
    const userFirstName = profile.firstName;
    const userLastName = profile.lastName;

    // If user is not logged in, redirect to sign in page
    if (!auth.uid) {
      this.setState({
        redirect: true
      })
    }

    postComment(postId, comment, userFirstName, userLastName);
  }

  render() {
    const { post, isDisabled } = this.state;
    const author = post.authorFirstName + ' ' + post.authorLastName;
    const comments = post.comments;

    return (
      <div id="content" className="ui container">
        {this.renderRedirectToSignIn()}
        <Card
          fluid
          color='orange'
          header={post.title}
          meta={author}
          description={post.content}
        />
        <Form id='comment-textarea'>
          <Form.TextArea
            id='comment'
            placeholder='Join the conversation!'
            type='text'
            onChange={this.handleChange}
            disabled={isDisabled}
          />
        </Form>
        <div id="post-comment">
          <Button color="green" onClick={this.handleClick} disabled={isDisabled}>Post</Button>
        </div>
        <div id="comments" className="ui container">
          <Feed>
            <Header as='h3'>Comments</Header>
            {comments && comments.map((comment, index) => {
              // console.log("LOGGING COMMENTS ");
              // console.log(comment);
              let text = comment.comment;
              let firstName = comment.userFirstName;
              let lastName = comment.userLastName;
              let date = comment.datePosted;
              return (
                <PostComments
                  key={index}
                  comment={text}
                  userFirstName={firstName}
                  userLastName={lastName}
                  datePosted={date}
                />
              )
            })}
          </Feed>
        </div>
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
    postComment: (postId, comment, userFirstName, userLastName) => (
      dispatch(postComment(postId, comment, userFirstName, userLastName))
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);