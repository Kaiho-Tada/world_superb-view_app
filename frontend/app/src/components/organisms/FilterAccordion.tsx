import { FC, memo, useContext } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from "@chakra-ui/react";

import { GenreCheckBox } from "components/molecules/GenreCheckBox";
import { CountryCheckBox } from "components/molecules/CountryCheckBox";
import { TypeCheckBox } from "components/molecules/TypeCheckBox";
import { PlaceContext } from "components/pages/AllPlaces";

export const FilterAccordion: FC = memo(() => {
  const { onClickClear, genre_categories, country_states } = useContext(PlaceContext)
  return (
          <Accordion allowMultiple w={{md: "25%", lg: "20%"}} display={{ base: "none", md: "block"}} pr={6} color="white">
            <Box as="span" flex='1' p="4" color="gray" fontWeight="bold" fontSize="lg" >
             絞り込み
            </Box>
            <Box as="button" color="blue.500" fontSize="sm" onClick={onClickClear} textAlign="right">
             クリア
            </Box>
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
                          <GenreCheckBox genre_category={genre_category} />
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
