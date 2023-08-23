import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

export const NavigationMenu = ({ menu, onMenuClick }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {menu.map((item) => (
            <MenuItem key={item.id} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{item.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menu.map((item) => (
          <Button
            key={item.id}
            onClick={() => onMenuClick(item.id)}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </React.Fragment>
  );
};
