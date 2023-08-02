import { ChangeEvent, FC, memo, useContext, useState } from "react";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { SearchPlace } from "lib/api/place";
import { useMessage } from "hooks/useMessage";
import { PlaceContext } from "components/pages/AllPlaces";

export const FilterDrawerSearchBox: FC = memo(() => {
  const { keyword, setKeyword, genres, countries, types, setPlaces } = useContext(PlaceContext)
  const {showMessage} = useMessage()
  const [loading, setLoading] = useState(false)
  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)
  const onClickSearchBox = () =>{
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
    <Flex className="search" align="center" justify="center" bgColor="white"
      borderRadius="10px" px="10px" py="4px" border="1px solid lightgray" >
      <Input placeholder='キーワード' size='sm'  border="none" bgColor="white" color="black" _focus={{boxShadow: "none"}}
        value={keyword} onChange={onChangeKeyword} />
      <IconButton aria-label='Search database' icon={<SearchIcon />} size='sm' bgColor="white" color="black"
      onClick={onClickSearchBox} _hover={{ bg: '#white' }} />
    </Flex>
  )
})
