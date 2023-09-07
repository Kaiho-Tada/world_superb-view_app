import { useMessage } from "hooks/useMessage";
import Cookies from "js-cookie";
import { signout } from "lib/api/auth";
import { useCallback } from "react";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: any;
};

export const useSignOut = (props: Props) => {
  const { setLoading, setIsSignedIn, navigate } = props
  const { showMessage } = useMessage();

  const handleSignOut = useCallback(async () => {
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
  }, [])
  return { handleSignOut }
}
