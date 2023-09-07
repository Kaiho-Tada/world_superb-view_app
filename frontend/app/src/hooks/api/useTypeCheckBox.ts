import { useCheckBoxLabel } from "hooks/provider/useCheckBoxLabelProvider";
import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
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
  types: Array<Types>;
  setTypes: Dispatch<SetStateAction<Types[]>>;
  keyword: string;
  riskLevels: Array<riskLevels>;
  seasons: Array<seasons>;
}
export const useTypeCheckBox = (props: Props) => {
  const { genres, countries, riskLevels, seasons, types, setTypes, setPlaces, keyword } = props;
  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessage();
  const { genreCheckBoxLabels, countryCheckBoxLabels, setTypeCheckBoxLabels, riskCheckBoxLabels } = useCheckBoxLabel();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    const newTypes = types.map(type => {
      if(type.label === e.target.value) {
        type.checked = !type.checked
      }
      return type
    });
    setTypes(newTypes);

    const filteredTypes = newTypes.filter(newType => {
      return newType.checked === true
    });

    const typeCheckBoxLabels = filteredTypes.map(filteredGenre => {
      return filteredGenre.label
    });
    setTypeCheckBoxLabels(typeCheckBoxLabels)

    const searchPlaces = async () => {
      setLoading(true);
      // const res = await SearchPlace(genre_names, country_names, type_names, keyword, riskLevelLabels)
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
  }, [genres, countries, riskLevels, seasons, types, keyword ]);
  return { handleChange };
};
