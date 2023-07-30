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
  genre_category: string,
  genres: Array<Genres>,
  setGenres: Dispatch<SetStateAction<Genres[]>>,
  countries: Array<Countries>,
  types: Array<Types>,
}

export const GenreCheckBox: FC<PlaceProps> = memo((props) => {
  const { setPlaces, genre_category, genres, setGenres, countries, types } = props
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
