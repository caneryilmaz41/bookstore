import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  toolbar: {
    justifyContent: 'center',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Online Bookstore
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
