import { ChangeEvent, FC, memo, useState } from "react"
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
// import { AuthContext } from "App"
import { useMessage } from "hooks/useMessage"
import { LoginData } from "types/api/auth"
import { login } from "lib/api/auth"
import { PrimaryButton } from "components/atoms/button/PrimaryButton"
import { useAuth } from "hooks/provider/useAuthProvider"
import { useLogin } from "hooks/api/useLogin"
// import AuthContext  from "context"
// import AuthContext from "hooks/useAuthProvider"
// import AuthContext from "context"
// import { AuthContext } from "context"
// import { AuthContext } from "context"

export const Login: FC = memo(() => {

  // const navigate = useNavigate();
  // const { setIsSignedIn, setCurrentUser, loading, setLoading } = useContext(AuthContext)
  const { setIsSignedIn, setCurrentUser, loading, setLoading } = useAuth();
  // const { setIsSignedIn, setCurrentUser, loading, setLoading } = useAuth()
  const { onClickLogin, email, setEmail, password, setPassword } = useLogin({setLoading, setCurrentUser, setIsSignedIn});

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword  = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <Flex role="form" align="center" justify="center" height="90vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="lg">
        <Heading as="h1" size="md" textAlign="center" my={3}>ログイン</Heading>
        <Divider my={3} />
        <Stack spacing={3} px={6} py={3}>
          <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          <Input role="text" placeholder="パスワード" type="password" value={password} onChange={onChangePassword} />
          <PrimaryButton loading={loading} isDisabled={email === "" || password === ""} onClick={onClickLogin}>
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
})
