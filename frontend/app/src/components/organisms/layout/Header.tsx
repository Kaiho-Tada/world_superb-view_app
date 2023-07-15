import { FC, memo, useCallback } from "react";
import { Flex, Heading, Link, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
export const Header: FC = memo(() => {

  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), [navigate])
  const onClickLogin = useCallback(() => navigate("/login"), [navigate])
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate])

  return (
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
      <IconButton aria-label="メニューボタン" icon={<HamburgerIcon />} size="md"
        variant="unstyled" display={{ base: "block", md: "none"}} />
    </Flex>
  )
})
