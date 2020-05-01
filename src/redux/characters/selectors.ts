import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

const getCharacters = (store: AppState) => store.character.characters;

const getPagination = (store: AppState) => store.character.pagination;

const getFilter = (store: AppState) => store.character.filter;

const getStatus = (store: AppState) => store.character.status;

export const getCharacter = (id: number) => (store: AppState) =>
  store.character.characters.find((character) => character.id === id);

export const getModifiedCharacter = (id: number) => (store: AppState) =>
  store.character.modifiedCharactersById[id]
    ? store.character.modifiedCharactersById[id]
    : undefined;

export const charactersSelector = createSelector(getCharacters, (state) => state);

export const paginationSelector = createSelector(getPagination, (state) => state);

export const filterSelector = createSelector(getFilter, (state) => state);

export const statusSelector = createSelector(getStatus, (state) => state);
