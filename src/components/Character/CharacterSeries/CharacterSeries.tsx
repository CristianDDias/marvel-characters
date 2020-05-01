import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { CharacterSeriesItem } from "./CharacterSeriesItem/CharacterSeriesItem";
import {
  clearSeries,
  fetchCharacterSeries,
  fetchCharacterSeriesNextPage,
} from "../../../redux/series/slice";
import {
  seriesSelector,
  paginationSelector,
  statusSelector,
} from "../../../redux/series/selectors";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > :not(:last-child)": {
      marginBottom: "8px",
    },
  },
  list: {
    width: "100%",
  },
});

interface CharacterSeriesProps {
  characterId: number;
}

// TODO: Implement error handling (status.error)

// TODO: Implement react-window or react-virtualized to efficiently render a large list

export const CharacterSeries: React.FC<CharacterSeriesProps> = ({ characterId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const series = useSelector(seriesSelector);
  const pagination = useSelector(paginationSelector);
  const status = useSelector(statusSelector);

  useEffect(() => {
    dispatch(clearSeries());
    dispatch(fetchCharacterSeries(characterId, 1));
  }, [characterId, dispatch]);

  const handleClickMore = () => {
    dispatch(fetchCharacterSeriesNextPage(characterId));
  };

  const renderSeries = () => {
    if (!status.loading && series.length === 0) {
      return <Typography>No series</Typography>;
    }
    if (series.length > 0) {
      return (
        <div className={classes.list}>
          {series.map((serie) => (
            <CharacterSeriesItem
              key={serie.id}
              img={serie.img}
              title={serie.title}
              description={serie.description}
            />
          ))}
        </div>
      );
    }
  };

  const renderLoading = () => {
    if (status.loading) {
      return <CircularProgress />;
    }
  };

  const renderButton = () => {
    if (!status.loading && series.length > 0 && pagination.page < pagination.totalPages) {
      return (
        <Button fullWidth variant="contained" color="primary" onClick={handleClickMore}>
          More
        </Button>
      );
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h6">Series</Typography>
      {renderSeries()}
      {renderLoading()}
      {renderButton()}
    </div>
  );
};
