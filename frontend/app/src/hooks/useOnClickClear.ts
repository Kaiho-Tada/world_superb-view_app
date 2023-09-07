import { Dispatch, SetStateAction, useCallback } from "react";
import { Countries } from "types/states/countries";
import { Genres } from "types/states/genres";
import { riskLevels } from "types/states/riskLevels";
import { Types } from "types/states/types";

type Props = {
  genres: Array<Genres>;
  setGenres: Dispatch<SetStateAction<Genres[]>>;
  countries: Array<Countries>;
  setCountries: Dispatch<SetStateAction<Countries[]>>;
  types: Array<Types>;
  setTypes: Dispatch<SetStateAction<Types[]>>;
  setKeyword: Dispatch<SetStateAction<string>>;
  getPlaces: () => Promise<void>;
  riskLevels: Array<riskLevels>;
  keyword: string;

};

export const useOnClickClear = (props: Props) => {
  const { genres, setGenres, countries, setCountries, types, setTypes, setKeyword, getPlaces, riskLevels, keyword } = props;

  const onClickClear = useCallback(() => {
    if (genres.length || countries.length || types.length || riskLevels.length || keyword != "") {
      const newGenres = genres.map(genre => {
        if(genre.checked = true){
          genre.checked = !genre.checked
        }
        return genre
      });
      setGenres(newGenres);

      const newCountries = countries.map(country => {
        if(country.checked = true) {
          country.checked = !country.checked
        }
        return country
      });
      setCountries(newCountries);

      const newTypes = types.map(type => {
        if(type.checked = true) {
          type.checked = !type.checked
        }
        return type
      });
      setTypes(newTypes);

      const newriskLevels = riskLevels.map(riskLevel => {
        if(riskLevel.checked = true) {
          riskLevel.checked = !riskLevel.checked
        }
        return riskLevel
      });
      setTypes(newTypes);

      setKeyword("");

      getPlaces();
    }
  }, [genres, countries, types]);
  return { onClickClear };
}
