import { Link } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  loading: boolean;
  isSignedIn: boolean;
  onClickLogin: () => any;
  onClickSignup: () => any;
  handleSignOut: () => Promise<void>;
};

export const AuthLinks: FC<Props> = memo((props) => {
  const { loading, isSignedIn, onClickLogin, onClickSignup, handleSignOut } = props;
  if (!loading) {
    if (isSignedIn) {
      return (
        <Link role="link" onClick={handleSignOut}>サインアウト</Link>
      )
    } else {
      return (
        <>
          <Link role="link" pr={4} onClick={onClickLogin}>ログイン</Link>
          <Link role="link" onClick={onClickSignup}>新規登録</Link>
        </>
      )
    }
  } else {
    return <></>
  }
});
