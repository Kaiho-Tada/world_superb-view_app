import { useDisclosure } from "@chakra-ui/react";
import { HeaderContext } from "context";
import { useSignOut } from "hooks/api/useSignOut";
import { FC, ReactNode, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuthProvider";

type Props = {
  children: ReactNode
};

export const useHeaderContext = () => useContext(HeaderContext);

const HeaderProvider: FC<Props> = ({children}) => {
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

  const value = {
    onClickHome,
    onClickLogin,
    onClickSignup,
    onClickAllPlaces,
    isOpenMenuDrawer,
    onOpenMenuDrawer,
    onCloseMenuDrawer,
    loading,
    isSignedIn,
    handleSignOut
  };

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
};
export { HeaderProvider };
