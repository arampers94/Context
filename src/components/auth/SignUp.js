import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className='login-form'>
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
              Sign up
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
                <Form.Input
                  fluid
                  placeholder='First Name'
                  id='firstName'
                  type='text'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  placeholder='Last Name'
                  id='lastName'
                  type='text'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large'>
                  Sign up
                </Button>
                <div id='error' className="ui container center">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </Segment>
            </Form>
            <Message>
              Already have an account? <NavLink to='/signin'>Sign in</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
