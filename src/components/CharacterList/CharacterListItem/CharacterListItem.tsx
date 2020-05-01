import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  item: {
    padding: "4px 8px",
  },
  paper: {
    padding: "8px",
    width: "100%",
  },
  paperButton: {
    width: "100%",
  },
  avatar: {
    width: "96px",
    height: "96px",
  },
  name: {
    textAlign: "start",
  },
});

interface CharacterListItemProps {
  id: number;
  name: string;
  img: string;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = ({ id, name, img }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${id}`);
  };

  return (
    <ListItem className={classes.item}>
      <ButtonBase className={classes.paperButton} focusRipple onClick={handleClick}>
        <Paper className={classes.paper}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Avatar variant="rounded" className={classes.avatar} src={img} />
            </Grid>
            <Grid item xs>
              <Typography className={classes.name}>{name}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>
    </ListItem>
  );
};
