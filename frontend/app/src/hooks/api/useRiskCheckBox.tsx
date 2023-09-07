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
  keyword: string;
  riskLevels: Array<riskLevels>;
  setRiskLevels: Dispatch<SetStateAction<riskLevels[]>>;
  seasons: Array<seasons>;
}
export const useRiskCheckBox = (props: Props) => {
  const { countries, types, genres, seasons, riskLevels, setPlaces, keyword, setRiskLevels } = props;
  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessage();
  const { genreCheckBoxLabels, countryCheckBoxLabels, typeCheckBoxLabels, setRiskCheckBoxLabels  } = useCheckBoxLabel();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    const newRiskLevels = riskLevels.map(riskLevel => {
      if(riskLevel.label == e.target.value) {
        riskLevel.checked = !riskLevel.checked
      };
      return riskLevel
    });
    setRiskLevels(newRiskLevels);

    const filteredRiskLevels = newRiskLevels.filter(newRiskLevel => {
      return newRiskLevel.checked === true
    });

    const riskCheckBoxLabels = filteredRiskLevels.map(filteredRiskLevel => {
      return filteredRiskLevel.label
    });
    setRiskCheckBoxLabels(riskCheckBoxLabels);

    const searchPlaces = async () => {
      setLoading(true);
      // const res = await SearchPlace(genre_names, country_names, type_names, keyword, riskLevelLabels)
      const res = await SearchPlace({genreCheckBoxLabels, countryCheckBoxLabels, typeCheckBoxLabels, riskCheckBoxLabels, keyword});

      console.log(res);
      if (res.status === 200) {
        setPlaces(res.data);
      }else {
        showMessage({title: "ユーザー取得に失敗しました", status: "error"});
      }
      setLoading(false);
    };
    searchPlaces();
  }, [ countries, types, genres, seasons, riskLevels, keyword ]);
  return { handleChange };
}
