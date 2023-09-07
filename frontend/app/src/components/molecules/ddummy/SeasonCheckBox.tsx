import { FC, memo, useContext, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { PlaceContext } from "components/pages/AllPlaces";
import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { Checkbox } from "@chakra-ui/react";

export const SeasonCheckBox: FC = memo(() => {
  const { setPlaces, seasons, setSeasons, riskLevels, setRiskLevels, genres, countries, types, keyword } = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const filteredCountries = countries.filter(country => {
      return country.checked == true
    })

    const country_names = filteredCountries.map(filteredCountry => {
      return filteredCountry.label
    })

    const filteredTypes = types.filter(type => {
      return type.checked == true
    })

    const type_names = filteredTypes.map(filteredType => {
      return filteredType.label
    })
    const filteredGenres = genres.filter(genre => {
      return genre.checked == true
    })

    const genre_names = filteredGenres.map(filteredGenre => {
      return filteredGenre.label
    })

    const filteredRiskLevels = riskLevels.filter(riskLevel => {
      return riskLevel.checked == true
    })

    const riskLevelNames = filteredRiskLevels.map(filteredRiskLevel => {
      return filteredRiskLevel.label
    })

    const newSeasons = seasons.map(season => {
      if(season.label == e.target.value) {
        season.checked = !season.checked
      }
      return season
    })
    // setRiskLevels(newSeasons)
    setSeasons(newSeasons)

    const filteredSeasons = newSeasons.filter(newRiskLevel => {
      return newRiskLevel.checked === true
    })

    const seasonsNames = filteredSeasons.map(filteredRiskLevel => {
      return filteredRiskLevel.label
    })

    const searchPlaces = async () => {
      setLoading(true)
      const res = await SearchPlace({genre_names, seasonsNames, country_names, type_names, riskLevelNames, keyword})

      console.log(res)
      if (res.status === 200) {
        setPlaces(res.data)
      }else {
        showMessage({title: "ユーザー取得に失敗しました", status: "error"})
      }
      setLoading(false)
    }

    searchPlaces()
  }

  return (
    <div>
      {seasons.map(season => {
        return (
          <Checkbox key={season.label} size='md' colorScheme='green' isChecked={season.checked} value={season.label} onChange={handleChange} pr="4">
            {season.label}
          </Checkbox>
        )
      })}
    </div>
  )
})
