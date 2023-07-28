import { Center, Flex, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useState, useEffect, useContext } from "react";
import { useMessage } from "hooks/useMessage"

import { PlaceAll } from "lib/api/place";
import { PlaceCard } from "components/organisms/place/PlaceCard";
import { Place } from "types/place";
import { AuthContext } from "App";

export const AllPlaces: FC = memo(() => {

  const [places, setPlaces] = useState<Array<Place>>([])
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const getPlaces = async () => {
    setLoading(true)
    const res = await PlaceAll()
    console.log(res)

    if (res.status === 200) {
      setPlaces(res.data)
    }else {
      showMessage({title: "ユーザー取得に失敗しました", status: "error"})
    }
    setLoading(false)
  }

  useEffect(() => {getPlaces()}, [])

  return (
    <>
      {loading ? (
        <Center h="90vh">
          <Spinner />
        </Center>
      ) :(
        <Flex py={{base: 6, md: 10, lg: 12}} px={{base: 3, md: 6, lg: 10}} bg="black">
          <Wrap>
            {places.map((place) => (
              <WrapItem key={place.id}>
                <PlaceCard imageUrl={place.imageUrl} name={place.name} countries={place.countries}/>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      )}
    </>
  )
})
