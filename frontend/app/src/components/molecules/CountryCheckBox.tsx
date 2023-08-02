import { Checkbox } from "@chakra-ui/react";
import { FC, memo, useContext, useState } from "react";

import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { PlaceContext } from "components/pages/AllPlaces";

type CountryCheckBoxProps = {
  country_state: string,
}

export const CountryCheckBox: FC<CountryCheckBoxProps> = memo((props) => {
  const { country_state } = props
  const { setPlaces, countries, setCountries, genres, types, keyword } = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const handleChange = (e: any) => {

    const filteredGenres = genres.filter(genre => {
      return genre.checked === true
    })

    const genre_names = filteredGenres.map(filteredGenre => {
      return filteredGenre.label
    })

    const filteredTypes = types.filter(type => {
      return type.checked === true
    })

    const type_names = filteredTypes.map(filteredType => {
      return filteredType.label
    })

    const newCountries = countries.map(country => {
      if(country.label === e.target.value) {
        country.checked = !country.checked
      }
      return country
    })
    setCountries(newCountries)

    const filteredCountries = newCountries.filter(newCountry => {
      return newCountry.checked === true
    })

    const country_names = filteredCountries.map(filteredCountry => {
      return filteredCountry.label
    })

    const searchPlaces = async () => {
      setLoading(true)
      const res = await SearchPlace(genre_names, country_names, type_names, keyword)

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
      {countries.map(country => {
        if(country.state === country_state) {
          return (
            <Checkbox key={country.label} size='md' colorScheme='green' isChecked={country.checked} value={country.label} onChange={handleChange}>
              {country.label}
            </Checkbox>
          )
        }
      })}
    </div>
  )
})
