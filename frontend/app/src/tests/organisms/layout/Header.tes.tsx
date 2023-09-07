import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import { Header } from "components/organisms/layout/Header";
import { AuthProvider } from "hooks/provider/useAuthProvider";
import userEvent from "@testing-library/user-event";
import { Login } from "components/pages/Login";
import client from "lib/api/client";
import MockAdapter from "axios-mock-adapter";

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe('ロゴの動作確認', () => {
  test('ロゴが表示されていること', () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const logo = screen.getByRole('link', { name: 'App' });
    // debug(logo)
    // const links = screen.getByRole('link');
    // debug(links)
    // debug()
    // screen.debug(IconButton)
    expect(logo).toBeInTheDocument();
  })
  test('ロゴ押下でHomeページへ遷移すること', async () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const logoLink = screen.getByRole('link', { name: 'App' });
    await userEvent.click(logoLink)
    expect(mockedNavigator).toHaveBeenCalledWith('/');
  })
})

describe('絶景一覧リンクのテスト', () => {
  test('絶景一覧リンクが存在すること', () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const viewLink = screen.getByRole('link', { name: '絶景一覧' });
    expect(viewLink).toBeInTheDocument();
  })

  // test('絶景一覧リンク押下で絶景一覧ページへ遷移すること', async () => {
  //   const {debug} = render(
  //     <AuthProvider>
  //       <BrowserRouter>
  //         <Header />
  //       </BrowserRouter>
  //     </AuthProvider>
  //   )
  //   const viewLink = screen.getByRole('link', { name: '絶景一覧' });
  //   await userEvent.click(viewLink)
  //   debug(viewLink)
  //   expect(mockedNavigator).toHaveBeenCalledWith('/places');
  // })
})

describe("ログインページのリンクのテスト", () => {
  test('ログインページのリンクが存在すること', () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const loginLink = screen.getByRole('link', { name: 'ログイン' });
    expect(loginLink).toBeInTheDocument();
  })
  test('ログインリンク押下でログインページへ遷移すること', () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const loginLink = screen.getByRole('link', { name: 'ログイン' });
    fireEvent.click(loginLink)
    expect(mockedNavigator).toHaveBeenCalledWith('/login');
  })
})

describe("新規登録ページのリンクのテスト", () => {
  test('新規登録ページのリンクが存在すること', () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const signupLink = screen.getByRole('link', { name: '新規登録' });
    expect(signupLink).toBeInTheDocument();
  })
  test('新規登録リンク押下でサインアップページへ遷移すること', () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthProvider>
    )
    const signUpLink = screen.getByRole('link', { name: '新規登録' });
    fireEvent.click(signUpLink)
    expect(mockedNavigator).toHaveBeenCalledWith('/signup');
    debug()
  })
})

const mockAxios = new MockAdapter(client);
mockAxios.onPost('/auth/sign_in').reply(200,
  {data: {
    id: 2,
    name: "test",
    email: "test@example.com",
  }}
)

test('メニューアイコンボタン押下でmenuDrawerが開くこと', () => {
  const {debug} = render(
    <AuthProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </AuthProvider>
  )
  const MenuIconBtn = screen.getByRole('button')
  userEvent.click(MenuIconBtn)
  const TopBtn = screen.getByRole('button', {name: 'Top'})
  expect(TopBtn).toBeInTheDocument();
  const LoginBtn = screen.getByRole('button', {name: 'ログイン'})
  expect(LoginBtn).toBeInTheDocument();
  const SignUpBtn = screen.getByRole('button', {name: '新規登録'})
  expect(SignUpBtn).toBeInTheDocument();
})


// beforeEach( async () => {
//   const {debug} = render(
//     <AuthProvider>
//       <BrowserRouter>
//         <Login/>
//       </BrowserRouter>
//     </AuthProvider>
//   );
//   const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
//   const passwordInput = screen.getByPlaceholderText('パスワード') as HTMLInputElement;
//   const loginButton = screen.getByRole('button', { name: "ログイン"});
//   expect(emailInput.value).toBe("");
//   expect(passwordInput.value).toBe("");
//   expect(loginButton).toBeDisabled();
//   await userEvent.type(emailInput, "test@example.com")
//   await userEvent.type(passwordInput, "password")
//   expect(loginButton).not.toBeDisabled();
//   await userEvent.click(loginButton)
//   // await waitFor(() => {
//   //   expect(mockedNavigator).toHaveBeenCalledWith('/');
//   //   expect(mockedNavigator).toHaveBeenCalledTimes(1);
//   // });
// });

// afterEach(() => {
//   // document.body.removeChild(container);
//   // container = null;
//   mockAxios.resetHistory()
// });

// test('ログイン後、サインアウトページのリンクが表示されていること', () => {
//   const {debug} = render(
//     <AuthProvider>
//       <BrowserRouter>
//         <Header />
//       </BrowserRouter>
//     </AuthProvider>
//   )
//   const signOutLink = screen.getByRole('link', { name: 'サインアウト' });
//   // const links = screen.getByRole('link');
//   // debug(links)
//   // debug()
//   // screen.debug(IconButton)
//   expect(signOutLink).toBeInTheDocument();
// })
