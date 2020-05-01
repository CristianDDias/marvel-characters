import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getCharacterSeries, Serie, Series } from "../../api/marvelApi";
import { paginationSelector } from "./selectors";

interface SeriesState {
  series: Serie[];
  pagination: {
    page: number;
    totalPages: number;
  };
  status: {
    loading: boolean;
    error: string;
  };
}

const initialState: SeriesState = {
  series: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  status: {
    loading: false,
    error: "",
  },
};

const slice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    getSeriesStart(state) {
      state.status = {
        loading: true,
        error: "",
      };
    },
    getSeriesSuccess(state, action: PayloadAction<Series>) {
      const { page, totalPages, series } = action.payload;
      state.series = series;
      state.pagination = {
        page,
        totalPages,
      };
      state.status = {
        loading: false,
        error: "",
      };
    },
    getSeriesFailure(state, action: PayloadAction<string>) {
      state.status = {
        loading: false,
        error: action.payload,
      };
    },
    clearSeries(state) {
      state.series = [];
    },
    addSeries(state, action: PayloadAction<Series>) {
      const { page, totalPages, series } = action.payload;
      state.series = [...state.series, ...series];
      state.pagination = {
        page,
        totalPages,
      };
      state.status = {
        loading: false,
        error: "",
      };
    },
  },
});

export const {
  setPage,
  getSeriesStart,
  getSeriesSuccess,
  getSeriesFailure,
  clearSeries,
  addSeries,
} = slice.actions;

export default slice.reducer;

export const fetchCharacterSeries = (characterId: number, page: number): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(getSeriesStart());
      const response = await getCharacterSeries(characterId, page);
      dispatch(getSeriesSuccess(response));
    } catch (error) {
      dispatch(getSeriesFailure(error.toString()));
    }
  };
};

export const fetchCharacterSeriesNextPage = (characterId: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { page, totalPages } = paginationSelector(getState());
      if (page < totalPages) {
        dispatch(getSeriesStart());
        const response = await getCharacterSeries(characterId, page + 1);
        dispatch(addSeries(response));
      }
    } catch (error) {
      dispatch(getSeriesFailure(error.toString()));
    }
  };
};
