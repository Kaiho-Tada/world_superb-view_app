import { Link } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  loading: boolean;
  isSignedIn: boolean;
  onClickLogin: () => any;
  onClickSignup: () => any;
  handleSignOut: () => Promise<void>;
};
// export const PrimaryButton: FC<Props> = memo((props) => {
//   const {children, isDisabled = false, loading = false, onClick} = props;
//   return (
//     <Button bg="teal.400" color="white" _hover={{opacity: 0.6}}
//       onClick={onClick} isLoading={loading} isDisabled={isDisabled || loading}>
//       {children}
//     </Button>
//   )
// });

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
