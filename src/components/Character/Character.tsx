import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CharacterProfile } from "./CharacterProfile/CharacterProfile";
import { CharacterSeries } from "./CharacterSeries/CharacterSeries";

const useStyles = makeStyles({
  container: {
    "& > :not(:last-child)": {
      marginBottom: "8px",
    },
  },
});

export const Character: React.FC = () => {
  const classes = useStyles();
  const { characterId } = useParams<{ characterId: string }>();

  const id = Number(characterId);

  return (
    <div className={classes.container}>
      <CharacterProfile characterId={id} />
      <CharacterSeries characterId={id} />
    </div>
  );
};
