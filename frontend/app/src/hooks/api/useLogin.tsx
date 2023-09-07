import Cookies from "js-cookie";
import { login } from "lib/api/auth";
import { useMessage } from "hooks/useMessage"
import { useCallback, useState } from "react";
import { LoginData } from "types/api/auth";
import { User } from "types/api/user";
import { useNavigate } from "react-router-dom";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
};

export const useLogin = (props: Props) => {
  const { setLoading, setIsSignedIn, setCurrentUser } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const onClickLogin = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    const data: LoginData = {
      email: email,
      password: password
    };
    try {
      const res = await login(data);
      console.log(res);

      if (res.status === 200) {
        showMessage({title: "ログインしました", status: "success"});
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");
        console.log("Signed in successfully!");
      } else {
        showMessage({title: "ログインに失敗しました", status: "error"});
      }
    } catch (err) {
      showMessage({title: "エラーが発生しました", status: "error"});
    };
    setLoading(false);
  },[email, password]);
  return { onClickLogin, email, setEmail, password, setPassword };
}
