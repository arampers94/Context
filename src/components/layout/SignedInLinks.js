import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  const { signOut } = props;
  return (
    <Menu.Menu position='right'>
      <Menu.Item>
        <NavLink to='/new-post'>
          <Icon.Group size='large'>
            <Icon name='edit' />
            <Icon corner='bottom right' name='add' />
          </Icon.Group>
        </NavLink>
      </Menu.Item>

      <Menu.Item>
        {/* <NavLink to='/'> */}
        <Icon name='log out' size='large' link onClick={signOut} />
        {/* </NavLink> */}
      </Menu.Item>
    </Menu.Menu>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);