import { FC, memo, useCallback } from "react";
import { Flex, Heading, Link, useDisclosure } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MenuDrawer } from "components/molecules/MenuDrawer";
import { MenuIconButton } from "components/atoms/button/MenuIconButton";
export const Header: FC = memo(() => {

  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), [navigate])
  const onClickLogin = useCallback(() => navigate("/login"), [navigate])
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate])

  const {
    isOpen: isOpenMenuDrawer,
    onOpen: onOpenMenuDrawer,
    onClose: onCloseMenuDrawer
  } = useDisclosure()

  return (
    <>
      <Flex as="nav" bg="white" color="gray.800" align="center"
        justify="space-between" padding={{base: 3, md: 5}} boxShadow='xl'>
        <Flex as="a" _hover={{ cursor: "pointer" }} onClick={onClickHome} >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }} >
            App
          </Heading>
        </Flex>
        <Flex fontSize="sm" display={{ base: "none", md: "flex"}}>
          <Link pr={4} onClick={onClickLogin}>ログイン</Link>
          <Link onClick={onClickSignup}>新規登録</Link>
        </Flex>
        <MenuIconButton onOpenMenuDrawer={onOpenMenuDrawer} />
      </Flex>
      <MenuDrawer onCloseMenuDrawer={onCloseMenuDrawer} isOpenMenuDrawer={isOpenMenuDrawer}
        onClickHome={onClickHome} onClickLogin={onClickLogin} onClickSignup={onClickSignup} />
    </>
  )
})
