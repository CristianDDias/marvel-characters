import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  avatar: {
    width: "96px",
    height: "96px",
  },
  title: {
    alignSelf: "center",
    marginLeft: "8px",
  },
  root: {
    "&$expanded": {
      margin: "8px 0px",
    },
  },
  expanded: {},
});

interface CharacterSeriesItemProps {
  img: string;
  title: string;
  description: string;
}

export const CharacterSeriesItem: React.FC<CharacterSeriesItemProps> = ({
  img,
  title,
  description,
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      classes={{ root: classes.root, expanded: classes.expanded }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Avatar className={classes.avatar} src={img} variant="rounded" />
        <Typography className={classes.title}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography color="textSecondary">
          {description ? description : "No description."}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
