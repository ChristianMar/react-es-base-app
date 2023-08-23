import React from 'react';
import { Container } from '@mui/system';
import { AppBar, Toolbar } from '@mui/material';

import { NavbarIcon } from './UINavbar';
import { UserMenu } from './UserMenu';
import { NavigationMenu } from './NavigationMenu';

export const Navbar = ({
  icon,
  avatar,
  username,
  menu,
  onMenuClick,
  userMenu,
  onUserMenuClick,
  onHome,
}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!icon ? null : (
            <NavbarIcon
              src={`data:image/png;base64,${icon}`}
              onClick={onHome}
            />
          )}
          <NavigationMenu menu={menu} onMenuClick={onMenuClick} />
          <UserMenu
            avatar={avatar}
            username={username}
            userMenu={userMenu}
            onUserMenuClick={onUserMenuClick}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
