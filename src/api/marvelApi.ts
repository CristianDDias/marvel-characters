import axios from "axios";

interface CharactersResponse {
  data: {
    offset: number;
    total: number;
    results: CharactersResult[];
  };
}

interface CharactersResult {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Character {
  id: number;
  name: string;
  description: string;
  img: {
    small: string;
    large: string;
  };
}

export interface Characters {
  page: number;
  totalPages: number;
  characters: Character[];
}

interface SeriesResponse {
  data: {
    offset: number;
    total: number;
    results: SeriesResult[];
  };
}

interface SeriesResult {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Series {
  page: number;
  totalPages: number;
  series: Serie[];
}

export interface Serie {
  id: number;
  title: string;
  description: string;
  img: string;
}

const pageLimit = 10;

const pageToOffset = (page: number) => {
  return (page - 1) * pageLimit;
};

const offsetToPage = (offset: number) => {
  return offset / pageLimit + 1;
};

const totalToTotalPages = (total: number) => {
  return Math.ceil(total / pageLimit);
};

const resultToCharacter = (result: CharactersResult): Character => {
  return {
    id: result.id,
    name: result.name,
    description: result.description,
    img: {
      small: `${result.thumbnail.path}/standard_medium.${result.thumbnail.extension}`,
      large: `${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`,
    },
  };
};

const resultToSerie = (result: SeriesResult): Serie => {
  return {
    id: result.id,
    title: result.title,
    description: result.description,
    img: `${result.thumbnail.path}/standard_medium.${result.thumbnail.extension}`,
  };
};

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

api.interceptors.request.use((requestConfig) => {
  if (!requestConfig.params) {
    requestConfig.params = {};
  }
  requestConfig.params.apikey = "e7aa91c18c32e98d0722989931da77a3";
  requestConfig.params.ts = "123456789";
  requestConfig.params.hash = "e3a10549e56c8ea7870b7dd9af9ce203";
  return requestConfig;
});

export const getCharacters = async (page: number, nameStartsWith: string): Promise<Characters> => {
  const params: any = {
    offset: pageToOffset(page),
    limit: pageLimit,
  };
  if (nameStartsWith) {
    params.nameStartsWith = nameStartsWith;
  }

  const {
    data: { data },
  } = await api.get<CharactersResponse>("/characters", { params });

  return {
    page: offsetToPage(data.offset),
    totalPages: totalToTotalPages(data.total),
    characters: data.results.map(resultToCharacter),
  };
};

export const getCharacterById = async (characterId: number): Promise<Characters> => {
  const {
    data: { data },
  } = await api.get<CharactersResponse>(`/characters/${characterId}`);

  return {
    page: 1,
    totalPages: 1,
    characters: data.results.map(resultToCharacter),
  };
};

export const getCharacterSeries = async (characterId: number, page: number): Promise<Series> => {
  const params: any = {
    offset: pageToOffset(page),
    limit: pageLimit,
    orderBy: "title",
  };

  const {
    data: { data },
  } = await api.get<SeriesResponse>(`/characters/${characterId}/series`, { params });

  return {
    page: offsetToPage(data.offset),
    totalPages: totalToTotalPages(data.total),
    series: data.results.map(resultToSerie),
  };
};
