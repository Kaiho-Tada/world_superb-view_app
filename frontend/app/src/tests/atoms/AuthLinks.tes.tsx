import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { AuthLinks } from "components/atoms/AuthLinks";

test('loadingがtrueの場合、何も表示されないこと', () => {
  const onClickLogin = jest.fn();
  const onClickSignup = jest.fn();
  const handleSignOut = jest.fn();

  render(<AuthLinks loading={true} isSignedIn={true} onClickLogin={onClickLogin}
    onClickSignup={onClickSignup} handleSignOut={handleSignOut}  />)
    const SignOutLink = screen.queryByRole("link", {name: "サインアウト"});
    expect(SignOutLink).toBeNull;
});

describe('isSignedInがtrueの場合のテスト', () => {
  test('サインアウトリンクが表示されていること', () => {
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const handleSignOut = jest.fn();
    const {debug} = render(<AuthLinks loading={false} isSignedIn={true} onClickLogin={onClickLogin}
      onClickSignup={onClickSignup} handleSignOut={handleSignOut} />)
    const SignOutLink = screen.getByRole("link", {name: "サインアウト"});
    expect(SignOutLink).toBeInTheDocument();
  });

  test('サインアウトリンク押下で押下で、propsに渡したhandleSignOutの関数が呼び出されること', () => {
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const handleSignOut = jest.fn();
    const {debug} = render(<AuthLinks loading={false} isSignedIn={true} onClickLogin={onClickLogin}
      onClickSignup={onClickSignup} handleSignOut={handleSignOut} />)
    const SignOutLink = screen.getByRole("link", {name: "サインアウト"});
    userEvent.click(SignOutLink);
    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });
})

describe('isSignedInがfalseの場合のテスト', () => {
  test('ログインリンクと新規登録リンクが表示されていること', () => {
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const handleSignOut = jest.fn();
    render(<AuthLinks loading={false} isSignedIn={false} onClickLogin={onClickLogin}
      onClickSignup={onClickSignup} handleSignOut={handleSignOut} />)
    const Loginlink = screen.getByRole("link", {name: "ログイン"});
    const Signuplink = screen.getByRole("link", {name: "新規登録"});
    expect(Loginlink).toBeInTheDocument();
    expect(Signuplink).toBeInTheDocument();
  });

  test('ログインリンク押下で、propsに渡したonClickLoginの関数が呼び出されること', () => {
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const handleSignOut = jest.fn();
    const {debug} = render(<AuthLinks loading={false} isSignedIn={false} onClickLogin={onClickLogin}
      onClickSignup={onClickSignup} handleSignOut={handleSignOut} />)
    const Loginlink = screen.getByRole("link", {name: "ログイン"});
    userEvent.click(Loginlink);
    expect(onClickLogin).toHaveBeenCalledTimes(1);
  });

  test('新規リンク押下で、propsに渡したonClickSignupの関数が呼び出されること', () => {
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const handleSignOut = jest.fn();
    const {debug} = render(<AuthLinks loading={false} isSignedIn={false} onClickLogin={onClickLogin}
      onClickSignup={onClickSignup} handleSignOut={handleSignOut} />)
    const Signuplink = screen.getByRole("link", {name: "新規登録"});
    userEvent.click(Signuplink);
    expect(onClickSignup).toHaveBeenCalledTimes(1);
  });
});
