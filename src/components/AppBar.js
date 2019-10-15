import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './AppBar.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div id="inventory-title" className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <div>Inventory</div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}