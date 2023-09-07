
import { render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import { Login } from "components/pages/Login";
import userEvent from "@testing-library/user-event";
import { Routes, useNavigate } from "react-router";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { User } from "types/api/user";
import { AuthProvider } from "hooks/provider/useAuthProvider";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Signup } from "components/pages/Signup";
import client from "lib/api/client";

// const mock = new MockAdapter(axios);
// mock.onPost(`http://localhost:3001/api/v1/auth/sign_in`);

afterEach(() => {
  mockAxios.resetHistory()
});

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

const mockAxios = new MockAdapter(client);
mockAxios.onPost('/auth').reply(200)

test('新規登録フォームが表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const signupForm = screen.getByRole('form');
  expect(signupForm).toBeInTheDocument();
})

test('新規登録フォームの見出しが表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const signupHeading = screen.getByRole('heading', { name: "新規登録"})
  expect(signupHeading).toBeInTheDocument();
})

test('ユーザーネームの記入欄が表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const nameInput = screen.getByPlaceholderText('名前');
  expect(nameInput).toBeInTheDocument();
})

test('メールアドレスの記入欄が表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const addressInput = screen.getByPlaceholderText('メールアドレス');
  expect(addressInput).toBeInTheDocument();
})

test('パスワードの記入欄が表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const passwordInput = screen.getByPlaceholderText('パスワード');
  expect(passwordInput).toBeInTheDocument();
})

test('パスワード確認の記入欄が表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const passwordConfirmInput = screen.getByPlaceholderText('パスワード確認');
  expect(passwordConfirmInput).toBeInTheDocument();
})

test('新規登録ボタンが表示されていること', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </AuthProvider>
  )
  const signupButton = screen.getByRole('button', { name: "新規登録"});
  expect(signupButton).toBeInTheDocument();
})


describe('ログイン機能のテスト', () => {
  test('ログイン成功でトップページに遷移されること', async () => {
    const {debug} = render(
      <AuthProvider>
        <BrowserRouter>
          <Signup/>
        </BrowserRouter>
      </AuthProvider>
    );
    const nameInput = screen.getByPlaceholderText('名前') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('パスワード') as HTMLInputElement;
    const passwordConfirmInput = screen.getByPlaceholderText('パスワード確認') as HTMLInputElement;

    const signupButton = screen.getByRole('button', { name: "新規登録"});
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(passwordConfirmInput.value).toBe("");
    expect(signupButton).toBeDisabled();
    await userEvent.type(nameInput, "テスト")
    await userEvent.type(emailInput, "test100000000@example.com")
    await userEvent.type(passwordInput, "password")
    await userEvent.type(passwordConfirmInput, "password")
    expect(signupButton).not.toBeDisabled();
    await userEvent.click(signupButton)

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith('/login');
    });
    expect(mockedNavigator).toHaveBeenCalledTimes(1);
  })
})



// describe('画面操作正常確認', () => {
//   // const [loading, setLoading] = useState<boolean>(false)
//   //   const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
//   //   const [currentUser, setCurrentUser] = useState<User | undefined>()
//   test('新規登録情報記入 > 新規登録ボタン押下', async() => {

//     const {debug} = render(
//       <AuthProvider>
//         <BrowserRouter>
//           <Signup />
//         </BrowserRouter>
//       </AuthProvider>
//     );

//     const nameInput = screen.getByPlaceholderText('名前') as HTMLInputElement;
//     const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
//     const passwordInput = screen.getByPlaceholderText('パスワード') as HTMLInputElement;
//     const passwordConfirmInput = screen.getByPlaceholderText('パスワード確認') as HTMLInputElement;

//     const signupButton = screen.getByRole('button', { name: "新規登録"});
//     expect(nameInput.value).toBe("");
//     expect(emailInput.value).toBe("");
//     expect(passwordInput.value).toBe("");
//     expect(passwordConfirmInput.value).toBe("");
//     expect(signupButton).toBeDisabled();
//     await userEvent.type(nameInput, "テスト")
//     await userEvent.type(emailInput, "test100000000@example.com")
//     await userEvent.type(passwordInput, "password")
//     await userEvent.type(passwordConfirmInput, "password")
//     expect(signupButton).not.toBeDisabled();
//     await userEvent.click(signupButton)
//   })
// })
