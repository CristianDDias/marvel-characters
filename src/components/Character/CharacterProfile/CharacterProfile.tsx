import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  fetchCharacterById,
  setModifiedCharacter,
  ModifiedCharacter,
} from "../../../redux/characters/slice";
import { getCharacter, getModifiedCharacter } from "../../../redux/characters/selectors";
import { Character } from "../../../api/marvelApi";

const useStyles = makeStyles({
  paper: {
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > :not(:last-child)": {
      marginBottom: "16px",
    },
  },
  avatar: {
    width: "216px",
    height: "324px",
  },
  fieldContainer: {
    width: "100%",
    display: "flex",
    "& > *": {
      flexGrow: 1,
      flexBasis: 0,
    },
    "& > :not(:first-child)": {
      marginLeft: "4px",
    },
    "& > :not(:last-child)": {
      marginRight: "4px",
    },
  },
});

type Profile = Character & ModifiedCharacter;

const initialProfile: Profile = {
  id: 0,
  name: "",
  description: "",
  img: {
    large: "",
    small: "",
  },
  weight: 0,
  height: 0,
};

interface CharacterProfileProps {
  characterId: number;
}

// TODO: Implement error handling (status.error)

export const CharacterProfile: React.FC<CharacterProfileProps> = ({ characterId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedCharacter = useSelector(getCharacter(characterId));
  const selectedModified = useSelector(getModifiedCharacter(characterId));
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    if (!selectedCharacter) {
      dispatch(fetchCharacterById(characterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  useEffect(() => {
    initializeProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacter]);

  const initializeProfile = () => {
    if (selectedCharacter) {
      if (selectedModified) {
        setProfile({ ...selectedCharacter, ...selectedModified });
      } else {
        setProfile({ ...selectedCharacter, weight: 0, height: 0 });
      }
    }
  };

  const handleClickEdit = () => {
    setEditing(true);
  };

  const handleClickCancel = () => {
    initializeProfile();
    setEditing(false);
  };

  const handleClickSave = () => {
    dispatch(
      setModifiedCharacter({
        id: characterId,
        modified: {
          description: profile.description,
          weight: profile.weight,
          height: profile.height,
        },
      })
    );
    setEditing(false);
  };

  const handleChange = (prop: keyof ModifiedCharacter) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, type } = event.target;
    setProfile({ ...profile, [prop]: type === "number" ? Number(value) : value });
  };

  return (
    <Paper className={classes.paper}>
      <Avatar variant="rounded" className={classes.avatar} src={profile.img.large} />

      <Typography variant="h5">{profile.name}</Typography>

      <TextField
        variant="outlined"
        size="small"
        type="text"
        label="Description"
        disabled={!editing}
        fullWidth
        value={profile.description}
        onChange={handleChange("description")}
        multiline
        rowsMax={4}
      />

      <div className={classes.fieldContainer}>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          label="Weight"
          disabled={!editing}
          fullWidth
          value={profile.weight}
          onChange={handleChange("weight")}
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          type="number"
          label="Height"
          disabled={!editing}
          fullWidth
          value={profile.height}
          onChange={handleChange("height")}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
      </div>

      <div className={classes.fieldContainer}>
        {editing ? (
          <>
            <Button variant="outlined" color="primary" onClick={handleClickCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleClickSave}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="outlined" color="primary" onClick={handleClickEdit}>
            Edit
          </Button>
        )}
      </div>
    </Paper>
  );
};
