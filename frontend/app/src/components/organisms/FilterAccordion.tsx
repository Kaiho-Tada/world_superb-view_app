import { FC, memo, useContext } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from "@chakra-ui/react";
import { GenreCheckBox } from "components/molecules/GenreCheckBox";
import { CountryCheckBox } from "components/molecules/CountryCheckBox";
import { TypeCheckBox } from "components/molecules/TypeCheckBox";
import { PlaceContext } from "components/pages/AllPlaces";
import { RiskRadio } from "components/molecules/ddummy/RiskRadio";
import { Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

export const FilterAccordion: FC = memo(() => {
  const { onClickClear, genreCategories, countryStates } = useContext(PlaceContext)
  return (
    <Accordion role="accordion" allowMultiple w={{md: "25%", lg: "20%"}} display={{ base: "none", md: "block"}} pr={6} color="white">
      <Flex justify="space-between" pb="1" pr="1">
        <Box as="span" pl="3" pr="5" >
          <Heading size="md" color="gray">
            絞り込み
          </Heading>
        </Box>
        <Box as="button" role="button" color="blue.500" fontSize="sm" onClick={onClickClear} textAlign="right">
          クリア
        </Box>
      </Flex>
      <AccordionItem mt="2">
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              ジャンル
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion allowMultiple>
            {
              genreCategories.map((genreCategory) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        {genreCategory}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <GenreCheckBox genreCategory={genreCategory} />
                  </AccordionPanel>
                </AccordionItem>
              ))
            }
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              地域
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion allowMultiple key="AreaAccordion">
            {
              countryStates.map((countryState) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        {countryState}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CountryCheckBox countryState={countryState} />
                  </AccordionPanel>
                </AccordionItem>
              ))
            }
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              属性
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TypeCheckBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              危険度
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <RiskRadio />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
})
