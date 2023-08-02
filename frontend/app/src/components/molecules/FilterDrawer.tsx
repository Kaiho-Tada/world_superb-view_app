import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { FilterDrawerAccordion } from "components/organisms/FilterDrawerAccordion";
import { PlaceContext } from "components/pages/AllPlaces";
import { FC, memo, useContext } from "react";

export const FilterDrawer: FC = memo(() => {
  const { onCloseFilterDrawer, isOpenFilterDrawer } = useContext(PlaceContext)

  return (
    <Drawer placement="right" onClose={onCloseFilterDrawer} isOpen={isOpenFilterDrawer} >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody py={3} >
            <FilterDrawerAccordion />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
})
