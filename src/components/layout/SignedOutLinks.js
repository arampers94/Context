import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const SignedOutLinks = () => {
  return (
    <Menu.Menu position='right'>
      <Menu.Item>
        <NavLink to='/signin'>Sign in</NavLink>
      </Menu.Item>

      <Menu.Item>
        <NavLink to='/signup'>Sign up</NavLink>
      </Menu.Item>
    </Menu.Menu>
  )
}

export default SignedOutLinks;