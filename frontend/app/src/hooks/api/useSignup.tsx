import { useMessage } from "hooks/useMessage";
import { signup } from "lib/api/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupData } from "types/api/auth";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export const useSignup = (props: Props) => {
  const { setLoading } = props;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const {showMessage} = useMessage();
  const navigate = useNavigate();

  const onClickSignup = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  }, [name, email, password, passwordConfirmation])
  return { onClickSignup, name, setName, email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation }
}
