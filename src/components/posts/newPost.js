import React, { Component } from 'react';
import { Form, Segment, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/postActions'

class NewPost extends Component {
  state = {
    title: '',
    content: ''
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { createPost } = this.props
    e.preventDefault();
    console.log(this.state);
    createPost(this.state);
    this.props.history.push('/');
  }

  render() {
    return (
      <div id="content" className="new-post-form">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.new-post-form {
            height: 100%;
          }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              New post
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  id='title'
                  label='Title'
                  placeholder='Make it a good title...'
                  type='text'
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  id='content'
                  label='Content'
                  placeholder='What would you like to share?'
                  type='text'
                  onChange={this.handleChange}
                />
                <Form.Button color='teal'>
                  Post
                </Form.Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => (dispatch(createPost(post)))
  }
}

export default connect(null, mapDispatchToProps)(NewPost);