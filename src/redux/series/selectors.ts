import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

const getSeries = (store: AppState) => store.serie.series;

const getPagination = (store: AppState) => store.serie.pagination;

const getStatus = (store: AppState) => store.serie.status;

export const seriesSelector = createSelector(getSeries, (state) => state);

export const paginationSelector = createSelector(getPagination, (state) => state);

export const statusSelector = createSelector(getStatus, (state) => state);
