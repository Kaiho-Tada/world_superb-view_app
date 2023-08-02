import { Checkbox } from "@chakra-ui/react";
import { FC, memo, useContext, useState } from "react";

import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { PlaceContext } from "components/pages/AllPlaces";

export const TypeCheckBox: FC = memo(() => {
  const { setPlaces, types, setTypes, genres, countries, keyword } = useContext(PlaceContext)
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
