import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import PostComments from './PostComments';
// import { showPostDetails } from '../../store/actions/postActions';
// import { connect } from 'react-redux';

class PostDetails extends Component {
  state = {
    post: this.props.post,
    comment: '',
    isDisabled: true
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      post: nextProps.post,
      isDisabled: nextProps.post.isDisabled
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { post, isDisabled } = this.state;
    // const { title, authorFirstName, authorLastName, content, createdAt, rating } = this.props;
    const author = post.authorFirstName + ' ' + post.authorLastName;

    return (
      <div id="content" className="ui container">
        <Card
          fluid
          color='orange'
          header={post.title}
          meta={author}
          description={post.content}
        />
        <Form>
          <Form.TextArea
            id='comment'
            placeholder='Join the conversation!'
            type='text'
            onChange={this.handleChange}
            disabled={isDisabled}
          />
        </Form>
        <div id="post-comment">
          <Button color="green">Post</Button>
        </div>
        <div>
          <PostComments />
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     showPostDetails: (post) => (dispatch(showPostDetails(post)))
//   }
// }

export default PostDetails;