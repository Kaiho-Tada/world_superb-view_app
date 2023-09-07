import { Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PlaceCardRiskStar } from "components/molecules/PlaceCardRiskStar";
import { FC, memo } from "react";
import { Country } from "types/api/country";
import { refCountry } from "types/ref/refCountry";
// import { RiskLevelsStar } from "components/molecules/RiskLevelsStars";

type Props = {
  imageUrl: string;
  name: string;
  countries: Array<refCountry>;
}

export const PlaceCard: FC<Props> = memo((props) => {
  const {imageUrl, name, countries} = props
  return (
    // <Flex w="200px" h="265px" borderRadius="10px" shadow="lg" _hover={{cursor: "pointer", opacity: "0.8"}}
    //   style={{ backgroundImage: `url("${imageUrl}")`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%" }}
    //   justify='center' align="end">
    //   <Box color="white" bg="RGBA(0, 0, 0, 0.3)" w="100%">
    //     <Text fontSize="large" fontWeight="bold" textAlign="center">{name}</Text>
    //     <Text role="paragraph" fontSize="sm" textAlign="center">
    //       {
    //         countries.map((country) => {
    //           if(countries.length > 1) {
    //             return country.name + " "
    //           }else{
    //             return country.name
    //           }
    //         })
    //       }
    //     </Text>
    //   </Box>
    // </Flex>
    <Box mr="5">
      <Flex h="280px" borderRadius="5px" showdow="lg"
        height="100%" textAlign="left" bg="gray.100"  _hover={{cursor: "pointer", opacity: "0.8"}}>
        <Image boxSize="180px" src={imageUrl} alt="絶景画像" />
        <Box>
          <Heading fontSize="lg" pt="3" pl="3" textShadow='1px 1px'>{name}</Heading>
          {/* <Text fontSize="large" fontWeight="bold" pt="3" pl="3" textShadow='1px 1px'>{name}</Text> */}
          <Box pt="2" pl="3">
            <Text fontSize="sm" noOfLines={4}>ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。</Text>
            <Text role="paragraph" fontSize="xs" color="gray.500" pt="1">
              {
                countries.map((country) => {
                  if(countries.length > 1) {
                    return country.name + " "
                  }else{
                    return country.name
                  }
                })
              }
            </Text>
            <PlaceCardRiskStar countries={countries} />
              {/* {if(countries.length > 1) {

              } else {
                if(countries[0].riskLevel == 4) {
                  <Heading size="xs" pr="2">4</Heading>
                  <Image  boxSize="13px" src={icon_star} mr="0.5" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" />
                  <Image  boxSize="13px" src={icon_star} mr="0.5" />
                  <Text fontSize="xs" pl="0.5">(リスクレベル)</Text>
                }
              }} */}
            {/* </Flex> */}
            <Flex>
              {/* <Heading size="xs" pr="2">BMI指数</Heading> */}
              <Text fontSize="xs" pr="1">BMI指数</Text>
              <Text fontSize="xs" pl="0.5">- 0.67</Text>
            </Flex>
            {/* <Box bg="blue.700" color="white" px="2" mr="2" >
              国
            </Box>
            <Text role="paragraph" fontSize="sm" textAlign="center">
              {
                countries.map((country) => {
                  if(countries.length > 1) {
                    return country.name + " "
                  }else{
                    return country.name
                  }
                })
              }
            </Text> */}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
})
