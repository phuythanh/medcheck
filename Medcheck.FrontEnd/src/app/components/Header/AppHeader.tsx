import React from 'react';
import IconHome from '../../icons/IconHome';
import { LoginPage } from '../../pages/LoginPage';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Button, Card, IconButton, Toolbar, Typography } from '@mui/material';
import { authorized, emailLoggedIn } from 'app/store/authSlice';
import { useSelector } from 'react-redux';
const AppHeader = () => {
  const history = useHistory();
  const isAuthorized = useSelector(authorized);
  const email = useSelector(emailLoggedIn);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.push('/')}
          >
            <HomeIcon />
          </IconButton>
          <Button color="inherit" onClick={() => history.push('/expense')}>
            Expense
          </Button>
          <Button color="inherit" onClick={() => history.push('/category')}>
            Category
          </Button>
          {isAuthorized ? (
            <>
              <Button color="inherit" onClick={() => history.push('/logout')}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => history.push('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
