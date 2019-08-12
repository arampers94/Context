import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
  return (
    <div id="navbar" className="ui fixed inverted main menu">
      <Menu fixed="top" inverted>
        <Menu.Item>
          <NavLink to='/'>
            <h3>Context</h3>
          </NavLink>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <NavLink to='/'>
              <Icon name='home' size='large' />
            </NavLink>
          </Menu.Item>

          <Menu.Item>
            <NavLink to='/about'>
              <Icon name='question' size='large' />
            </NavLink>
          </Menu.Item>

          {links}

        </Menu.Menu>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar);
