import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { setFilterNameStartsWith } from "../../redux/characters/slice";
import { filterSelector } from "../../redux/characters/selectors";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginRight: "8px",
    flexGrow: 1,
    flexBasis: 0,
  },
});

export const Search: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  const [search, setSearch] = useState(() => filter.nameStartsWith);

  const handleClickSearch = () => {
    dispatch(setFilterNameStartsWith(search));
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyDownSearch = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      handleClickSearch();
    }
  };

  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        variant="outlined"
        size="small"
        placeholder="Search character..."
        value={search}
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDownSearch}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={handleClickSearch}
      >
        Search
      </Button>
    </div>
  );
};
