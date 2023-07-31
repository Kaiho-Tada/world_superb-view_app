import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { FilterDrawerAccordion } from "components/organisms/FilterDrawerAccordion";
import { Dispatch, FC, memo, SetStateAction } from "react";

import { Places } from "types/place";
import { Countries } from "types/states/country";
import { Genres } from "types/states/genre";
import { Types } from "types/states/type";

type Props = {
  isOpenFilterDrawer: boolean,
  onCloseFilterDrawer: () => void,
  onClickClear: () => void,
  setPlaces: Dispatch<SetStateAction<Places[]>>,
  genres: Array<Genres>,
  setGenres: Dispatch<SetStateAction<Genres[]>>,
  countries: Array<Countries>,
  setCountries: Dispatch<SetStateAction<Countries[]>>,
  types: Array<Types>,
  setTypes: Dispatch<SetStateAction<Types[]>>
  genre_categories: string[],
  country_states: string[],
}

export const FilterDrawer: FC<Props> = memo((props) => {
  const { isOpenFilterDrawer, onCloseFilterDrawer, onClickClear, setPlaces, genres, setGenres,
    countries, setCountries, types, setTypes, genre_categories, country_states } = props

  return (
    <Drawer placement="right" onClose={onCloseFilterDrawer} isOpen={isOpenFilterDrawer} >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody py={3} >
            <FilterDrawerAccordion onCloseFilterDrawer={onCloseFilterDrawer}onClickClear={onClickClear}
              setPlaces={setPlaces} genres={genres} setGenres={setGenres} countries={countries} setCountries={setCountries}
              types={types} setTypes={setTypes} genre_categories={genre_categories} country_states={country_states}/>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
})
