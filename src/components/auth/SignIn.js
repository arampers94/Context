import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div id='login' className='login-form'>
        {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  id='email'
                  type='email'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id='password'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large'>
                  Login
                </Button>
                <div id='error' className="ui container center">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </Segment>
            </Form>
            <Message>
              Need an account? <NavLink to='/signup'>Sign up</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
