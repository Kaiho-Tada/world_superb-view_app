import { FC, memo } from "react"
import {Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button} from "@chakra-ui/react"
import { CloseButton } from "@chakra-ui/react";

type Props = {
  onCloseMenuDrawer: () => void;
  isOpenMenuDrawer: boolean;
  onClickHome: () => void;
  onClickAllPlaces: () => void;
  onClickLogin: () => void;
  onClickSignup: () => void;
}

export const MenuDrawer: FC<Props> = memo((props) => {
  const { onCloseMenuDrawer, isOpenMenuDrawer, onClickHome, onClickAllPlaces, onClickLogin, onClickSignup } = props
  return (
    <Drawer role="drawer" placement="left" size="xs" onClose={onCloseMenuDrawer} isOpen={isOpenMenuDrawer} >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0}>
            <CloseButton alt="close" aria-hidden="false" bg="white" w="100%" onClick={onCloseMenuDrawer} />
            <Button bg="white" w="100%" onClick={() => {onClickHome(); onCloseMenuDrawer()}}>Top</Button>
            <Button bg="white" w="100%" onClick={() => {onClickAllPlaces(); onCloseMenuDrawer()}}>絶景一覧</Button>
            <Button bg="white" w="100%" onClick={() => {onClickLogin(); onCloseMenuDrawer()}}>ログイン</Button>
            <Button bg="white" w="100%" onClick={() => {onClickSignup(); onCloseMenuDrawer()}}>新規登録</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
})
