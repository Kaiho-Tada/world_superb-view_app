import { ChangeEvent, FC, memo, useContext, useState } from "react"
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { AuthContext } from "App"
import { useMessage } from "hooks/useMessage"
import { LoginData } from "types/api/auth"
import { login } from "lib/api/auth"
import { PrimaryButton } from "components/atoms/button/PrimaryButton"

export const Login: FC = memo(() => {

  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser, loading, setLoading } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { showMessage } = useMessage();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword  = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setLoading(true)

    const data: LoginData = {
      email: email,
      password: password
    }

    try {
      const res = await login(data)
      console.log(res)

      if (res.status === 200) {
        showMessage({title: "ログインしました", status: "success"})
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        showMessage({title: "ログインに失敗しました", status: "error"})
      }
    } catch (err) {
      showMessage({title: "エラーが発生しました", status: "error"})
    }
    setLoading(false)
  }

  return (
    <Flex align="center" justify="center" height="90vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="lg">
        <Heading as="h1" size="md" textAlign="center" my={3}>ログイン</Heading>
        <Divider my={3} />
        <Stack spacing={3} px={6} py={3}>
          <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          <Input placeholder="パスワード" type="password" value={password} onChange={onChangePassword} />
          <PrimaryButton loading={loading} isDisabled={email === "" || password === ""} onClick={onClickLogin}>
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
})
