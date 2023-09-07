import { useCheckBoxLabel } from "hooks/provider/useCheckBoxLabelProvider";
import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react"
import { Place } from "types/api/place";
import { Countries } from "types/states/countries";
import { Genres } from "types/states/genres";
import { riskLevels } from "types/states/riskLevels";
import { seasons } from "types/states/seasons";
import { Types } from "types/states/types";

type Props = {
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  genres: Array<Genres>;
  setGenres: Dispatch<SetStateAction<Genres[]>>;
  countries: Array<Countries>;
  types: Array<Types>;
  riskLevels: Array<riskLevels>;
  seasons: Array<seasons>;
  keyword: string;
};

export const useGenreCheckBox = (props: Props) => {
  const { setPlaces, genres, setGenres, countries, types, riskLevels, seasons, keyword } = props;
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  const { countryCheckBoxLabels, typeCheckBoxLabels, setGenreCheckBoxLabels, riskCheckBoxLabels  } = useCheckBoxLabel();
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    const newGenres = genres.map(genre => {
      if(genre.label === e.target.value) {
        genre.checked = !genre.checked
      };
      return genre
    });
    setGenres(newGenres);

    const filteredGenres = newGenres.filter(newGenre => {
      return newGenre.checked === true
    });

    const genreCheckBoxLabels = filteredGenres.map(filteredGenre => {
      return filteredGenre.label
    });
    setGenreCheckBoxLabels(genreCheckBoxLabels)

    const searchPlaces = async () => {
      setLoading(true);
      // const res = await SearchPlace(genre_names, country_names, type_names, keyword, riskLevelNames)
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
  }, [genres, countries, types, riskLevels, seasons, keyword])
  return { handleChange };
};
