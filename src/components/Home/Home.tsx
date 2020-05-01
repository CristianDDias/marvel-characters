import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CharacterList } from "../CharacterList/CharacterList";
import { Search } from "../Search/Search";
import { statusSelector } from "../../redux/characters/selectors";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  backdrop: {
    zIndex: 999,
  },
  list: {
    flexGrow: 1,
    flexBasis: 0,
    marginTop: "8px",
  },
});

// TODO: Implement error handling (status.error)

export const Home: React.FC = () => {
  const classes = useStyles();
  const status = useSelector(statusSelector);

  return (
    <div className={classes.container}>
      <Backdrop open={status.loading} className={classes.backdrop}>
        <CircularProgress />
      </Backdrop>

      <Search />
      <div className={classes.list}>
        <CharacterList />
      </div>
    </div>
  );
};
