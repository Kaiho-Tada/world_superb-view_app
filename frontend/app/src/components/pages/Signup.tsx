import React, { useState, useContext,  FC, memo, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "App"
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { useMessage } from "hooks/useMessage"
import { SignupData } from "types/api/auth"
import { signup } from "lib/api/auth"
import { PrimaryButton } from "components/atoms/button/PrimaryButton"


export const Signup: FC = memo(() => {
  const navigate = useNavigate()

  const { loading, setLoading } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const {showMessage} = useMessage();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword  = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)

  const onClickSignup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setLoading(true)

    const data: SignupData = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirm_success_url: "http://localhost:4000/login"
    }

    try {
      const res = await signup(data)
      console.log(res)

      if (res.status === 200) {

        showMessage({title: '登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。', status: "success"})


        navigate("/login")
        console.log("Signed in successfully!")
      } else {
        showMessage({title: "メールアドレスまたはパスワードが間違っています", status: "error"})
      }
    } catch (err) {
      showMessage({title: "エラーが発生しました", status: "error"})
    }
    setLoading(false)
  }

  return (
    <Flex align="center" justify="center" height="90vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="lg">
        <Heading as="h1" size="md" textAlign="center" my={3}>新規登録</Heading>
        <Divider my={3} />
        <Stack spacing={4} px={6} py={2}>
          <Input placeholder="名前" value={name} onChange={onChangeName} />
          <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          <Input placeholder="パスワード" type="password" value={password} onChange={onChangePassword} />
          <Input placeholder="パスワード" type="password" value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
          <PrimaryButton isDisabled={name === "" || email === "" || password === "" || passwordConfirmation === "" }
            loading={loading} onClick={onClickSignup}>新規登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
})
