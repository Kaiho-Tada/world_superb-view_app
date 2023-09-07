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
  seasons: Array<seasons>;
}

export const useFilterSearchBox = (props: Props) => {
  const { setPlaces, genres, countries, types, riskLevels, seasons, keyword } = props;
  const {showMessage} = useMessage();
  const [loading, setLoading] = useState(false);

  const onClickSearchBox = useCallback(() =>{
    const filteredGenres = genres.filter(genre => {
      return genre.checked === true
    })

    const genre_names = filteredGenres.map(filteredGenre => {
      return filteredGenre.label
    })
    const filteredCountries = countries.filter(country => {
      return country.checked === true
    })

    const country_names = filteredCountries.map(filteredCountry => {
      return filteredCountry.label
    })

    const filteredTypes = types.filter(type => {
      return type.checked === true
    })

    const type_names = filteredTypes.map(filteredType => {
      return filteredType.label
    })

    const filteredRiskLevels = riskLevels.filter(riskLevel => {
      return riskLevel.checked === true
    })

    const riskLevelNames = filteredRiskLevels.map(filteredRiskLevel => {
      return filteredRiskLevel.label
    })

    const filteredSeasons = seasons.filter(season => {
      return season.checked === true
    })

    const seasonsNames = filteredSeasons.map(filteredRiskLevel => {
      return filteredRiskLevel.label
    })

    const searchPlaces = async () => {
      setLoading(true)
      // const res = await SearchPlace(genre_names, country_names, type_names, keyword, risk_level)
      const res = await SearchPlace({genre_names, country_names, type_names, riskLevelNames, seasonsNames, keyword});

      console.log(res)
      if (res.status === 200) {
        setPlaces(res.data)
      }else {
        showMessage({title: "ユーザー取得に失敗しました", status: "error"})
      }
      setLoading(false)
    }

    searchPlaces()
  }, [genres, countries, types, riskLevels, seasons, keyword])
  return { onClickSearchBox }
}
