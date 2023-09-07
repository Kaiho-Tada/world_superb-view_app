import { FC, memo, useCallback } from "react";
import { Flex, Heading, Link, useDisclosure } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MenuDrawer } from "components/molecules/MenuDrawer";
import { MenuIconButton } from "components/atoms/button/MenuIconButton";
import { useAuth } from "hooks/provider/useAuthProvider";
import { useSignOut } from "hooks/api/useSignOut";
import { AuthLinks } from "components/atoms/links/AuthLinks";

export const Header: FC = memo(() => {

  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), [navigate]);
  const onClickLogin = useCallback(() => navigate("/login"), [navigate]);
  const onClickSignup = useCallback(() => navigate("/signup"), [navigate]);
  const onClickAllPlaces = useCallback(() => navigate("/places"), [navigate]);

  const {
    isOpen: isOpenMenuDrawer,
    onOpen: onOpenMenuDrawer,
    onClose: onCloseMenuDrawer
  } = useDisclosure();

  const { loading, setLoading, isSignedIn, setIsSignedIn } = useAuth();
  const { handleSignOut } = useSignOut({ setLoading, setIsSignedIn, navigate });

  return (
    <>
      <Flex as="nav" bg="white" color="gray.800" align="center"
        justify="space-between" padding={{base: 3, md: 5}} boxShadow='xl'>
        <Flex as="a" role="link" _hover={{ cursor: "pointer" }} onClick={onClickHome} >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }} >
            App
          </Heading>
        </Flex>
        <Flex role="link" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex"}}>
          <Link pl={{base: 4, lg: 8}} onClick={onClickAllPlaces}>絶景一覧</Link>
        </Flex>
        <Flex fontSize="sm" display={{ base: "none", md: "flex"}}>
          <AuthLinks loading={loading} isSignedIn={isSignedIn} onClickLogin={onClickLogin}
            onClickSignup={onClickSignup} handleSignOut={handleSignOut} />
        </Flex>
        <MenuIconButton onOpenMenuDrawer={onOpenMenuDrawer} />
      </Flex>
      <MenuDrawer onCloseMenuDrawer={onCloseMenuDrawer} isOpenMenuDrawer={isOpenMenuDrawer}
        onClickHome={onClickHome} onClickAllPlaces={onClickAllPlaces} onClickLogin={onClickLogin} onClickSignup={onClickSignup} />
    </>
  );
});
