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
  setKeyword: Dispatch<SetStateAction<string>>;
  riskLevels: Array<riskLevels>;
  seasons: Array<seasons>;
  keyword: string;
};

export const useOnclickClearKeyword = (props: Props) => {
  const { setKeyword, setPlaces, genres, countries, types, riskLevels, seasons, keyword } = props;
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const { genreCheckBoxLabels, countryCheckBoxLabels, typeCheckBoxLabels, riskCheckBoxLabels } = useCheckBoxLabel();

  const onClickClearKeyword = useCallback(() => {
    setKeyword("");
    const keyword = "";

    const searchPlaces = async () => {
      setLoading(true);
      // const res = await SearchPlace(genre_names, country_names, type_names, keyword, risk_level)
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
  }, [genres, countries, types, riskLevels, seasons, keyword]);
  return { onClickClearKeyword };
}
