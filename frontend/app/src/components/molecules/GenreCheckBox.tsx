import { Checkbox } from "@chakra-ui/react";
import { FC, memo, useContext, useState } from "react";

import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { PlaceContext } from "components/pages/AllPlaces";

type GenreCheckBoxProps = {
  genre_category: string,
}

export const GenreCheckBox: FC<GenreCheckBoxProps> = memo((props) => {
  const { genre_category } = props
  const { setPlaces, genres, setGenres, countries, types, keyword } = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const handleChange = (e: any) => {

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

    const newGenres = genres.map(genre => {
      if(genre.label === e.target.value) {
        genre.checked = !genre.checked
      }
      return genre
    })
    setGenres(newGenres)

    const filteredGenres = newGenres.filter(newGenre => {
      return newGenre.checked === true
    })

    const genre_names = filteredGenres.map(filteredGenre => {
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
      {genres.map(genre => {
        if(genre.category === genre_category) {
          return (
            <Checkbox key={genre.label} size='md' colorScheme='green' isChecked={genre.checked} value={genre.label} onChange={handleChange}>
              {genre.label}
            </Checkbox>
          )
        }
      })}
    </div>
  )
})
