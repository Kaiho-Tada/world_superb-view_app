import { FC, memo, useCallback, useContext } from "react";
import { Flex, Heading, Link, useDisclosure } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MenuDrawer } from "components/molecules/MenuDrawer";
import { MenuIconButton } from "components/atoms/button/MenuIconButton";
import Cookies from "js-cookie"

import { AuthContext } from "App";
import { signout } from "lib/api/auth";
import { useMessage } from "hooks/useMessage";

export const Header: FC = memo(() => {

  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), [navigate])
  const onClickLogin = useCallback(() => navigate("/login"), [navigate])
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate])
  const onClickAllPlaces = useCallback(() => navigate("/places"), [navigate])

  const {
    isOpen: isOpenMenuDrawer,
    onOpen: onOpenMenuDrawer,
    onClose: onCloseMenuDrawer
  } = useDisclosure()

  const { loading, setLoading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const { showMessage } = useMessage();

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const res = await signout()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/login")

        showMessage({title: "サインアウトしました", status: "success"})
      } else {
        showMessage({title: "サインアウトに失敗しました", status: "error"})
      }
    } catch (err) {
      showMessage({title: "エラーが発生しました", status: "error"})
    }
    setLoading(false)
  }

  const AuthLinks = () => {

    if (!loading) {
      if (isSignedIn) {
        return (
          <Link onClick={handleSignOut}>サインアウト</Link>
        )
      } else {
        return (
          <>
            <Link pr={4} onClick={onClickLogin}>ログイン</Link>
            <Link onClick={onClickSignup}>新規登録</Link>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <Flex as="nav" bg="white" color="gray.800" align="center"
        justify="space-between" padding={{base: 3, md: 5}} boxShadow='xl'>
        <Flex as="a" _hover={{ cursor: "pointer" }} onClick={onClickHome} >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }} >
            App
          </Heading>
        </Flex>
        <Flex fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex"}}>
          <Link pl={{base: 4, lg: 8}} onClick={onClickAllPlaces}>絶景一覧</Link>
        </Flex>
        <Flex fontSize="sm" display={{ base: "none", md: "flex"}}>
          <AuthLinks />
        </Flex>
        <MenuIconButton onOpenMenuDrawer={onOpenMenuDrawer} />
      </Flex>
      <MenuDrawer onCloseMenuDrawer={onCloseMenuDrawer} isOpenMenuDrawer={isOpenMenuDrawer}
        onClickHome={onClickHome} onClickLogin={onClickLogin} onClickSignup={onClickSignup} />
    </>
  )
})
