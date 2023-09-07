import { FC, memo, useContext, useState } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Flex, CloseButton } from "@chakra-ui/react";
import { GenreCheckBox } from "components/molecules/GenreCheckBox";
import { CountryCheckBox } from "components/molecules/CountryCheckBox";
import { TypeCheckBox } from "components/molecules/TypeCheckBox";
import { PlaceContext } from "components/pages/AllPlaces";
import { FilterDrawerSearchBox } from "components/molecules/FilterDrawerSearchBox";
import { Heading } from "@chakra-ui/react";
import { RiskCheckBox } from "components/molecules/RiskCheckBox";
import { CheckBoxLabelProvider } from "hooks/provider/useCheckBoxLabelProvider";

export const FilterDrawerAccordion: FC = memo(() => {
  const { onCloseFilterDrawer, onClickClear, genreCategories, countryStates } = useContext(PlaceContext);

  return (
    <CheckBoxLabelProvider>
      <Accordion allowMultiple role="accordion">
        <Flex justify="space-between" textAlign="center">
          <CloseButton size='md' onClick={onCloseFilterDrawer} />
          {/* <Box color="black" fontWeight="bold" fontSize="xl" textAlign="center" > */}
            <Heading size="md" pt="1">
              絞り込み
            </Heading>
          {/* </Box> */}
          <Box as="button" color="blue.500" fontSize="sm" onClick={onClickClear}>
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
                      <GenreCheckBox genreCategory={genreCategory}/>
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
        {/* <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                ベストシーズン
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SeasonCheckBox />
          </AccordionPanel>
        </AccordionItem> */}
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
            <RiskCheckBox />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </CheckBoxLabelProvider>
  );
});
