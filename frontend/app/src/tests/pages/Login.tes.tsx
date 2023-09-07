import {render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import { Login } from "components/pages/Login";
import userEvent from "@testing-library/user-event";

import { AuthProvider } from "hooks/provider/useAuthProvider";
import MockAdapter from "axios-mock-adapter";
import client from "lib/api/client";
// const mock = new MockAdapter(axios);
// mock.onPost(`http://localhost:3001/api/v1/auth/sign_in`);

afterEach(() => {
  // document.body.removeChild(container);
  // container = null;
  mockAxios.resetHistory()
});

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

const mockAxios = new MockAdapter(client);
mockAxios.onPost('/auth/sign_in').reply(200,
  {data: {
    id: 2,
    name: "test",
    email: "test@example.com",
  }}
)
// expect(container.getElementsByClassName('loginForm').textContent)).toBe('header')　　// テスト成功
// expect(container.getElementsByClassName('card-body').item(0)?.textContent)).toBe('body')

test('ログインフォームが表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  )
  // const loginForm = container.getElementsByClassName('loginForm')
  const loginForm = screen.getByRole('form');
    // debug(logo)
    // const links = screen.getByRole('link');
    // debug(links)
    // debug()
    // screen.debug(IconButton)
    // expect(loginForm).toBeInTheDocument();
  debug(loginForm)
})

test('ログインフォームの見出しが表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  )
  const loginHeading = screen.getByRole('heading', { name: "ログイン"})
  expect(loginHeading).toBeInTheDocument();
})

test('メールアドレスの記入欄が存在すること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  )
  const addressInput = screen.getByPlaceholderText('メールアドレス');
  expect(addressInput).toBeInTheDocument();
})

test('パスワードの記入欄が存在すること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  )
  const passwordInput = screen.getByPlaceholderText('パスワード');
  expect(passwordInput).toBeInTheDocument();
})

test('ログインボタンが存在すること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  )
  const loginButton = screen.getByRole('button', { name: "ログイン"});
  expect(loginButton).toBeInTheDocument();
})

describe('ログイン機能のテスト', () => {
  test('ログイン成功でトップページに遷移されること', async () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </AuthProvider>
    );
    const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('パスワード') as HTMLInputElement;
    const loginButton = screen.getByRole('button', { name: "ログイン"});
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(loginButton).toBeDisabled();
    await userEvent.type(emailInput, "test@example.com")
    await userEvent.type(passwordInput, "password")
    expect(loginButton).not.toBeDisabled();
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith('/');
    });
    expect(mockedNavigator).toHaveBeenCalledTimes(1);
  })

  // test('ログインに失敗した場合、トップページに画面遷移されないこと', async () => {
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

  //   await waitFor(() => {
  //     expect(mockedNavigator).toHaveBeenCalledTimes(1);
  //   });
  // })
})






// describe('画面操作正常確認', () => {
//   // const [loading, setLoading] = useState<boolean>(false)
//   //   const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
//   //   const [currentUser, setCurrentUser] = useState<User | undefined>()
//   test('ログイン情報の記入 > ログインボタン押下', async() => {
//     const user = userEvent

//     // act(() => {
//     //   const container = document.getElementById('root') as HTMLElement;
//     //   const root = createRoot(container);
//     //   root.render(<App />);
//     //   // ReactDOM.createRoot(container).render(<App />);

//     //   // <Login />, { wrapper: App }

//     // });
//     // const { loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useAuthContext();
//     const {debug} = render(
//       <AuthProvider>
//         <BrowserRouter>
//           <Login/>
//         </BrowserRouter>
//       </AuthProvider>
//     );
//     // await act(async () => {
//     //   const {debug} = render(
//     //     <AuthProvider>
//     //       <BrowserRouter>
//     //         <Login/>
//     //       </BrowserRouter>
//     //     </AuthProvider>
//     //   );
//     // });

//     const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
//     const passwordInput = screen.getByPlaceholderText('パスワード') as HTMLInputElement;
//     const loginButton = screen.getByRole('button', { name: "ログイン"});
//     expect(emailInput.value).toBe("");
//     expect(passwordInput.value).toBe("");
//     expect(loginButton).toBeDisabled();
//     await userEvent.type(emailInput, "test@example.com")
//     await userEvent.type(passwordInput, "password")
//     expect(loginButton).not.toBeDisabled();
//     await userEvent.click(loginButton)
//     // console.log(mockedNavigator)

//     await waitFor(() => {
//       expect(mockedNavigator).toHaveBeenCalledWith('/');
//       expect(mockedNavigator).toHaveBeenCalledTimes(1);
//     });




//     // const toast =screen.getByText('ログインしました')
//     // const false_toast =screen.getByText('エラーが発生しました')

//     // debug();
//     // screen.debug()
//     // const success_toast = document.getElementById("toast-9");
//     // const successToast = document.querySelector('#toast-1-title') as HTMLElement;
//     // debug(successToast.textContent)
//     // expect(successToast.textContent).toBe("ログインしました");
//     // expect(successToast).toBeInTheDocument();

//     // await userEvent.type(emailInput, "test100@example.com")
//     // await userEvent.type(passwordInput, "password")
//     // expect(loginButton).not.toBeDisabled();
//     // await userEvent.click(loginButton)
//     // const falseToast = document.querySelector('#toast-3-title') as HTMLElement;
//     // console.log(document.querySelector('.chakra-portal') as HTMLElement)
//     // expect(falseToast).toBeInTheDocument();


//   })
// })
