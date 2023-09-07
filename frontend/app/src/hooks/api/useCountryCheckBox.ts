import { useCheckBoxLabel } from "hooks/provider/useCheckBoxLabelProvider";
import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { Place } from "types/api/place";
import { Countries } from "types/states/countries";
import { Genres } from "types/states/genres";
import { riskLevels } from "types/states/riskLevels";
import { seasons } from "types/states/seasons";
import { Types } from "types/states/types";

type Props = {
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  genres: Array<Genres>;
  countries: Array<Countries>;
  setCountries: Dispatch<SetStateAction<Countries[]>>;
  types: Array<Types>;
  keyword: string;
  riskLevels: Array<riskLevels>;
  seasons: Array<seasons>;
};

export const useCountryCheckBox = (props: Props) => {
  const { setPlaces, genres, types, riskLevels, seasons, countries, setCountries, keyword } = props;
  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessage();
  const { genreCheckBoxLabels, typeCheckBoxLabels, setCountryCheckBoxLabels, riskCheckBoxLabels  } = useCheckBoxLabel();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    const newCountries = countries.map(country => {
      if(country.label == e.target.value) {
        country.checked = !country.checked;
      }
      return country;
    });
    setCountries(newCountries);

    const filteredCountries = newCountries.filter(newCountry => {
      return newCountry.checked == true;
    });

    const countryCheckBoxLabels = filteredCountries.map(filteredCountry => {
      return filteredCountry.label;
    });
    setCountryCheckBoxLabels(countryCheckBoxLabels);

    const searchPlaces = async () => {
      setLoading(true);
      // const res = await SearchPlace(genre_names, country_names, type_names, keyword, riskLevelLabels);
      const res = await SearchPlace({genreCheckBoxLabels, countryCheckBoxLabels, typeCheckBoxLabels, riskCheckBoxLabels, keyword});

      console.log(res);
      if (res.status === 200) {
        setPlaces(res.data);
      }else {
        showMessage({title: "ユーザー取得に失敗しました", status: "error"});
      };
      setLoading(false);
    };
    searchPlaces();
  }, [genres, types, riskLevels, seasons, countries, keyword]);
  return { handleChange, };
};
