import { Image, Flex } from "@chakra-ui/react";
import { FC, memo } from "react";
import icon_star from "img/star_3991433.png";
import { Text } from "@chakra-ui/react";
import icon_zero_star from "img/star.png";
import { refCountry } from "types/ref/refCountry";

type Props = {
  countries: Array<refCountry>;
}

export const PlaceDetailPagesRiskStar: FC<Props> = memo((props) => {
  const { countries } = props;

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
                <Flex align="center" pr="1">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(maxRiskLevel == 3){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(maxRiskLevel == 2){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Text fontSize="sm" pl="1">(リスクレベルの高い方を表示)</Text>
                </Flex>
              )
            } else if(maxRiskLevel == 1){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(maxRiskLevel == 0){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_zero_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            }
          } else {
            if(countries[0].riskLevel == 4) {
              return (
                <Flex align="center" pr="1">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(countries[0].riskLevel == 3){
              return (
                <Flex align="center" >
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(countries[0].riskLevel == 2){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(countries[0].riskLevel == 1){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            } else if(countries[0].riskLevel == 0){
              return (
                <Flex align="center">
                  <Image boxSize="13px" src={icon_zero_star} mr="1" alt="リスクレベルスター" />
                </Flex>
              )
            }
          }
        })()
      }
    </div>
  );
});
