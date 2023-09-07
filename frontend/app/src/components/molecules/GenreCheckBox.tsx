import { Checkbox } from "@chakra-ui/react";
import { FC, memo, useContext, useState } from "react";
import { PlaceContext } from "components/pages/AllPlaces";
import { useGenreCheckBox } from "hooks/api/useGenreCheckBox";

type GenreCheckBoxProps = {
  genreCategory: string,
}

export const GenreCheckBox: FC<GenreCheckBoxProps> = memo((props) => {
  const { genreCategory } = props
  const { setPlaces, genres, setGenres, countries, types, keyword, riskLevels, seasons } = useContext(PlaceContext)
  // const [loading, setLoading] = useState(false)
  // const {showMessage} = useMessage()
  const { handleChange } = useGenreCheckBox({ setPlaces, genres, setGenres, countries, types, riskLevels, seasons, keyword })

  return (
    <div>
      {genres.map(genre => {
        if(genre.category === genreCategory) {
          return (
            <Checkbox aria-hidden="false" key={genre.label} size='md' colorScheme='green' isChecked={genre.checked} value={genre.label} onChange={handleChange}>
              {genre.label}
            </Checkbox>
          )
        }
      })}
    </div>
  )
})
