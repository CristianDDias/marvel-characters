import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import { CharacterListItem } from "./CharacterListItem/CharacterListItem";
import { fetchCharacters, setPage } from "../../redux/characters/slice";
import {
  charactersSelector,
  filterSelector,
  paginationSelector,
  statusSelector,
} from "../../redux/characters/selectors";

const useStyles = makeStyles({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  list: {
    flexGrow: 1,
    flexBasis: 0,
    width: "100%",
    overflow: "auto",
    marginBottom: "8px",
  },
  noCharacter: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

// TODO: Implement error handling (status.error)

export const CharacterList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const characters = useSelector(charactersSelector);
  const pagination = useSelector(paginationSelector);
  const status = useSelector(statusSelector);
  const filter = useSelector(filterSelector);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    dispatch(fetchCharacters(pagination.page, filter.nameStartsWith));
  }, [pagination.page, filter.nameStartsWith, dispatch]);

  const handleChangePage = (_: any, page: number) => {
    dispatch(setPage(page));
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  const renderList = () => {
    if (!status.loading && characters.length === 0) {
      return (
        <div className={classes.noCharacter}>
          <InfoIcon style={{ fontSize: "48px" }} />
          <Typography variant="h6">No character found</Typography>
        </div>
      );
    }
    return (
      <div className={classes.container}>
        <List disablePadding className={classes.list} ref={listRef}>
          {characters.map((character) => (
            <CharacterListItem
              key={character.id}
              id={character.id}
              name={character.name}
              img={character.img.small}
            />
          ))}
        </List>
        <Pagination
          page={pagination.page}
          count={pagination.totalPages}
          color="primary"
          onChange={handleChangePage}
        />
      </div>
    );
  };

  return renderList();
};
