import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { FC, memo } from "react";
import icon_star from "img/star_3991433.png";
import icon_zero_star from "img/star.png";
import { refCountry } from "types/ref/refCountry";

type Props = {
  countries: Array<refCountry>;
}

export const PlaceCardRiskStar: FC<Props> = memo((props) => {
  const { countries } = props

  return (
    <div>
      {
        (() => {
          if(countries.length > 1) {
            const riskLevels = countries.map((country) => {
              return country.riskLevel
            })
            const maxRiskLevel = Math.max(...riskLevels);
            if(maxRiskLevel == 4) {
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">4</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベルの高い方を表示)</Text>
                </Flex>
              )
            } else if(maxRiskLevel == 3){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">3</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベルの高い方を表示)</Text>
                </Flex>
              )
            } else if(maxRiskLevel == 2){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">2</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベルの高い方を表示)</Text>
                </Flex>
              )
            } else if(maxRiskLevel == 1){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">1</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベルの高い方を表示)</Text>
                </Flex>
              )
            } else if(maxRiskLevel == 0){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">0</Heading>
                  <Image boxSize="13px" src={icon_zero_star} mr="1" alt="リスクレベルスター" />
                  <Text fontSize="xs">(リスクレベルの高い方を表示)</Text>
                </Flex>
              )
            }
          } else {
            if(countries[0].riskLevel == 4) {
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">4</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベル)</Text>
                </Flex>
              )
            } else if(countries[0].riskLevel == 3){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">3</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベル)</Text>
                </Flex>
              )
            } else if(countries[0].riskLevel == 2){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">2</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベル)</Text>
                </Flex>
              )
            } else if(countries[0].riskLevel == 1){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">1</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" alt="リスクレベルスター" />
                  <Text fontSize="xs" pl="0.5">(リスクレベル)</Text>
                </Flex>
              )
            } else if(countries[0].riskLevel == 0){
              return (
                <Flex align="center">
                  <Heading size="xs" pr="2">0</Heading>
                  <Image boxSize="13px" src={icon_zero_star} mr="1" alt="リスクレベルスター" />
                  <Text fontSize="xs">(リスクレベル)</Text>
                </Flex>
              )
            }
          }
        })()
      }
    </div>
  )
})
