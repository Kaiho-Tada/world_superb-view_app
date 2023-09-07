import { FC, memo, useContext } from "react";
import icon_star from "img/star_3991433.png";
import { Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { PlaceContext } from "components/pages/AllPlaces";
import { Checkbox } from "@chakra-ui/react";
import icon_zero_star from "img/star.png";
import { useRiskCheckBox } from "hooks/api/useRiskCheckBox";

export const RiskCheckBox: FC = memo(() => {
  const { setPlaces, riskLevels, setRiskLevels, genres, countries, types, keyword, seasons } = useContext(PlaceContext)
  const { handleChange } = useRiskCheckBox({ countries, types, genres, seasons, riskLevels, setPlaces, keyword, setRiskLevels });

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
                  <Image boxSize="13px" src={icon_zero_star} mr="1.5" />
                </Flex>
              </Checkbox>
            )
          }
        })
      }
    </VStack>
  )
})
