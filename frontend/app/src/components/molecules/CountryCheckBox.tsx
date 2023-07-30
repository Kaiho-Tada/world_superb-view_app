import { Checkbox } from "@chakra-ui/react";
import { FC, memo, Dispatch, useState } from "react";
import { SetStateAction } from "react";

import { useMessage } from "hooks/useMessage";
import { Places } from "types/place";
import { SearchPlace } from "lib/api/place";

type Genres = {
  label: string,
  category: string,
  place_names: string[],
  checked: boolean
}

type Countries = {
  label: string,
  state: string,
  place_names: string[],
  checked: boolean
}

type Types = {
  label: string,
  place_names: string[],
  checked: boolean
}

type PlaceProps = {
  setPlaces: Dispatch<SetStateAction<Places[]>>,
  country_state: string,
  countries: Array<Countries>,
  setCountries: Dispatch<SetStateAction<Countries[]>>,
  genres: Array<Genres>,
  types: Array<Types>,
}

export const CountryCheckBox: FC<PlaceProps> = memo((props) => {

  const { setPlaces, country_state, countries, setCountries, genres, types} = props
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
      const res = await SearchPlace(genre_names, country_names, type_names)

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
