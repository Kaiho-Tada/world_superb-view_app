import { FC, memo, useContext, useState } from "react";
import icon_star from "img/star_3991433.png";
// import icon_star from "img/favourite_399410.png"
import { Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react";
import { Radio } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { PlaceContext } from "components/pages/AllPlaces";
import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { Checkbox } from "@chakra-ui/react";

export const RiskRadio: FC = memo(() => {
  const { setPlaces, riskLevels, setRiskLevels, genres, countries, types, keyword } = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

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
    const filteredGenres = genres.filter(genre => {
      return genre.checked === true
    })

    const genre_names = filteredGenres.map(filteredGenre => {
      return filteredGenre.label
    })

    const newRiskLevels = riskLevels.map(riskLevel => {
      if(riskLevel.label == e.target.value) {
        riskLevel.checked = !riskLevel.checked
      }
      return riskLevel
    })
    setRiskLevels(newRiskLevels)

    const filteredRiskLevels = newRiskLevels.filter(newRiskLevel => {
      return newRiskLevel.checked === true
    })

    const riskLevelLabels = filteredRiskLevels.map(filteredRiskLevel => {
      return filteredRiskLevel.label
    })

    const searchPlaces = async () => {
      setLoading(true)
      const res = await SearchPlace(genre_names, country_names, type_names, keyword, riskLevelLabels)

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
    <VStack align="left">
      {
        riskLevels.map((riskLevel) => {
          if(riskLevel.label == "4") {
            return (
              <Checkbox aria-hidden="false" size='md' colorScheme='green' value={riskLevel.label} isChecked={riskLevel.checked} onChange={handleChange}>
                <Flex align="center" pl="1">
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                  </Flex>
              </Checkbox>
            )
          }else if(riskLevel.label == "3") {
            return (
              <Checkbox aria-hidden="false" size='md' colorScheme='green' value={riskLevel.label} isChecked={riskLevel.checked} onChange={handleChange}>
                <Flex align="center" pl="1">
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                  </Flex>
              </Checkbox>
            )
          }else if(riskLevel.label == "2") {
            return (
              <Checkbox aria-hidden="false" size='md' colorScheme='green' value={riskLevel.label} isChecked={riskLevel.checked} onChange={handleChange}>
                <Flex align="center" pl="1">
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                  </Flex>
              </Checkbox>
            )
          }else if(riskLevel.label == "1") {
            return (
              <Checkbox aria-hidden="false" size='md' colorScheme='green' value={riskLevel.label} isChecked={riskLevel.checked} onChange={handleChange}>
                <Flex align="center" pl="1">
                    <Image  boxSize="13px" src={icon_star} mr="1.5" />
                  </Flex>
              </Checkbox>
            )
          }else if(riskLevel.label == "0") {
            return (
              <Checkbox aria-hidden="false" size='md' colorScheme='green' value={riskLevel.label} isChecked={riskLevel.checked} onChange={handleChange}>
                <Flex align="center" pl="1">
                  0
                </Flex>
              </Checkbox>
            )
          }
        })
      }
    </VStack>
  )
})
