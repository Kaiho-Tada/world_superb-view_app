import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { Country } from "types/api/country";

type Props = {
  imageUrl: string;
  name: string;
  countries: Array<Country>;
}

export const PlaceCard: FC<Props> = memo((props) => {
  const {imageUrl, name, countries} = props
  return (
    <Flex w="200px" h="265px" borderRadius="10px" shadow="lg" _hover={{cursor: "pointer", opacity: "0.8"}}
      style={{ backgroundImage: `url("${imageUrl}")`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%" }}
      justify='center' align="end">
      <Box color="white" bg="RGBA(0, 0, 0, 0.3)" w="100%">
        <Text fontSize="large" fontWeight="bold" textAlign="center">{name}</Text>
        <Text fontSize="sm" textAlign="center">
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
      </Box>
    </Flex>
  )
})
