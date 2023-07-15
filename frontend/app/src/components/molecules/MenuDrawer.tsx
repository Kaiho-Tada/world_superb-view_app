import { FC, memo } from "react"
import {Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button} from "@chakra-ui/react"

type Props = {
  onCloseMenuDrawer: () => void;
  isOpenMenuDrawer: boolean;
  onClickHome: () => void;
  onClickLogin: () => void;
  onClickSignup: () => void;
}

export const MenuDrawer: FC<Props> = memo((props) => {
  const {onCloseMenuDrawer, isOpenMenuDrawer, onClickHome, onClickLogin, onClickSignup} = props
  return (
    <Drawer placement="left" size="xs" onClose={onCloseMenuDrawer} isOpen={isOpenMenuDrawer} >
      <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0}>
              <Button bg="white" w="100%" onClick={() => {onClickHome(); onCloseMenuDrawer()}}>Top</Button>
              <Button bg="white" w="100%" onClick={() => {onClickLogin(); onCloseMenuDrawer()}}>ログイン</Button>
              <Button bg="white" w="100%" onClick={() => {onClickSignup(); onCloseMenuDrawer()}}>新規登録</Button>
            </DrawerBody>
          </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
})
