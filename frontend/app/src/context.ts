import React, { createContext, Dispatch, SetStateAction } from 'react';
import { Place } from 'types/api/place';
import { User } from 'types/api/user';
import { Countries } from 'types/states/countries';
import { Genres } from 'types/states/genres';
import { riskLevels } from 'types/states/riskLevels';
import { seasons } from 'types/states/seasons';
import { Types } from 'types/states/types';

export const HeaderContext = createContext({} as {
  onClickHome: () => any;
  onClickLogin: () => any;
  onClickSignup: () => any;
  onClickAllPlaces: () => any;
  isOpenMenuDrawer: () => void;
  onOpenMenuDrawer: () => void;
  onCloseMenuDrawer: () => void;
  loading: boolean;
  isSignedIn: boolean;
  handleSignOut: () => Promise<void>;
});

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
});

export const CheckBoxLabelContext = createContext({} as {
  genreCheckBoxLabels: Array<string>;
  setGenreCheckBoxLabels: React.Dispatch<React.SetStateAction<Array<string>>>;
  countryCheckBoxLabels: Array<string>;
  setCountryCheckBoxLabels: React.Dispatch<React.SetStateAction<Array<string>>>;
  typeCheckBoxLabels: Array<string>;
  setTypeCheckBoxLabels: React.Dispatch<React.SetStateAction<Array<string>>>;
  riskCheckBoxLabels: Array<string>;
  setRiskCheckBoxLabels: React.Dispatch<React.SetStateAction<Array<string>>>;
});

export const PlaceContext = createContext({} as {
  onCloseFilterDrawer: () => void;
  isOpenFilterDrawer: () => void;
  onClickClear: () => void;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  genres: Array<Genres>;
  setGenres: Dispatch<SetStateAction<Genres[]>>;
  countries: Array<Countries>;
  setCountries: Dispatch<SetStateAction<Countries[]>>;
  types: Array<Types>;
  setTypes: Dispatch<SetStateAction<Types[]>>;
  genreCategories: string[];
  countryStates: string[];
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  riskLevels: Array<riskLevels>;
  setRiskLevels: Dispatch<SetStateAction<riskLevels[]>>;
  seasons: Array<seasons>;
  setSeasons: Dispatch<SetStateAction<seasons[]>>;
});
