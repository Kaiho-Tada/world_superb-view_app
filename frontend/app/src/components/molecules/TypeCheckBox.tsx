import { Checkbox } from "@chakra-ui/react";
import { FC, memo, Dispatch, useState } from "react";
import { SetStateAction } from "react";

import { useMessage } from "hooks/useMessage";
import { Places } from "types/place";
import { SearchPlace } from "lib/api/place";
import { Types } from "types/states/type";
import { Genres } from "types/states/genre";
import { Countries } from "types/states/country";


type PlaceProps = {
  setPlaces: Dispatch<SetStateAction<Places[]>>,
  types: Array<Types>,
  setTypes: Dispatch<SetStateAction<Types[]>>,
  genres: Array<Genres>,
  countries: Array<Countries>,
}

export const TypeCheckBox: FC<PlaceProps> = memo((props) => {

  const { setPlaces, types, setTypes, genres, countries } = props
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const handleChange = (e: any) => {

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

    const newTypes = types.map(type => {
      if(type.label === e.target.value) {
        type.checked = !type.checked
      }
      return type
    })
    setTypes(newTypes)

    const filteredTypes = newTypes.filter(newType => {
      return newType.checked === true
    })

    const type_names = filteredTypes.map(filteredGenre => {
      return filteredGenre.label
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
      {types.map(type => {
        return (
          <Checkbox key={type.label} size='md' colorScheme='green' isChecked={type.checked} value={type.label} onChange={handleChange}>
            {type.label}
          </Checkbox>
        )
      })}
    </div>
  )
})
