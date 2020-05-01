import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getCharacters, getCharacterById, Character, Characters } from "../../api/marvelApi";

export interface ModifiedCharacter {
  description: string;
  weight: number;
  height: number;
}

interface CharactersState {
  characters: Character[];
  modifiedCharactersById: Record<number, ModifiedCharacter>;
  pagination: {
    page: number;
    totalPages: number;
  };
  filter: {
    nameStartsWith: string;
  };
  status: {
    loading: boolean;
    error: string;
  };
}

const initialState: CharactersState = {
  characters: [],
  modifiedCharactersById: {},
  pagination: {
    page: 1,
    totalPages: 1,
  },
  filter: {
    nameStartsWith: "",
  },
  status: {
    loading: false,
    error: "",
  },
};

const slice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setFilterNameStartsWith(state, action: PayloadAction<string>) {
      state.filter.nameStartsWith = action.payload;
      state.pagination.page = 1;
    },
    setModifiedCharacter(
      state,
      action: PayloadAction<{ id: number; modified: ModifiedCharacter }>
    ) {
      const { id, modified } = action.payload;
      state.modifiedCharactersById[id] = modified;
    },
    getCharactersStart(state) {
      state.status = {
        loading: true,
        error: "",
      };
    },
    getCharactersSuccess(state, action: PayloadAction<Characters>) {
      const { page, totalPages, characters } = action.payload;
      state.characters = characters;
      state.pagination = {
        page,
        totalPages,
      };
      state.status = {
        loading: false,
        error: "",
      };
    },
    getCharactersFailure(state, action: PayloadAction<string>) {
      state.status = {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  setPage,
  setFilterNameStartsWith,
  setModifiedCharacter,
  getCharactersStart,
  getCharactersSuccess,
  getCharactersFailure,
} = slice.actions;

export default slice.reducer;

export const fetchCharacters = (page: number, nameStartsWith: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(getCharactersStart());
      const response = await getCharacters(page, nameStartsWith);
      dispatch(getCharactersSuccess(response));
    } catch (error) {
      dispatch(getCharactersFailure(error.toString()));
    }
  };
};

export const fetchCharacterById = (characterId: number): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(getCharactersStart());
      const response = await getCharacterById(characterId);
      dispatch(getCharactersSuccess(response));
    } catch (error) {
      dispatch(getCharactersFailure(error.toString()));
    }
  };
};
