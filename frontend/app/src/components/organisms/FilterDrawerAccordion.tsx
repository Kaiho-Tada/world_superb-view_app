import { FC, memo, useContext } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Flex, CloseButton } from "@chakra-ui/react";

import { GenreCheckBox } from "components/molecules/GenreCheckBox";
import { CountryCheckBox } from "components/molecules/CountryCheckBox";
import { TypeCheckBox } from "components/molecules/TypeCheckBox";
import { PlaceContext } from "components/pages/AllPlaces";
import { FilterDrawerSearchBox } from "components/molecules/FilterDrawerSearchBox";

export const FilterDrawerAccordion: FC = memo(() => {
  const { onCloseFilterDrawer, onClickClear, genre_categories, country_states } = useContext(PlaceContext)
  return (
    <Accordion allowMultiple>
      <Flex>
        <CloseButton size='md' mt="2" onClick={onCloseFilterDrawer} />
        <Box flex='1' p="2" color="black" fontWeight="bold" fontSize="xl" textAlign="center" >
          絞り込み
        </Box>
        <Box as="button" color="blue.500" fontSize="sm" onClick={onClickClear} textAlign="right">
          クリア
        </Box>
      </Flex>
      <AccordionItem mt="2">
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              キーワード
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <FilterDrawerSearchBox />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
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
              genre_categories.map((genre_category) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        {genre_category}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <GenreCheckBox genre_category={genre_category}/>
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
          <Accordion allowMultiple>
            {
              country_states.map((country_state) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        {country_state}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CountryCheckBox country_state={country_state} />
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
    </Accordion>
  )
})
