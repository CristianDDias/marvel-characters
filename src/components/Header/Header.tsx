import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "./MarvelLogo.svg";

const useStyles = makeStyles({
  appBar: {
    background: "#202020",
  },
  toolBar: {
    justifyContent: "center",
  },
  logo: {
    height: "36px",
    marginRight: "8px",
  },
});

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolBar} variant="dense">
        <img className={classes.logo} src={logo} alt="logo" />
        <Typography variant="h5">Characters</Typography>
      </Toolbar>
    </AppBar>
  );
};
