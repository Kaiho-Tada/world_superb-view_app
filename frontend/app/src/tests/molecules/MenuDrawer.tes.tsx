import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { PlaceProvider } from "hooks/provider/useTestPlaceProvider";
import userEvent from "@testing-library/user-event";
import { CheckBoxLabelProvider } from "hooks/provider/useCheckBoxLabelProvider";
import { RiskCheckBox } from "components/molecules/RiskCheckBox";
import { MenuDrawer } from "components/molecules/MenuDrawer";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

describe('Topボタンのテスト', () => {
  test('Topボタンが表示されていること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const topBottun = screen.getByRole('button', {name: /Top/});
    expect(topBottun).toBeInTheDocument();
  });
  test('Topボタン押下でonClickHome関数とonCloseMenuDrawer関数が呼び出されること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const topBottun = screen.getByRole('button', {name: /Top/});
    userEvent.click(topBottun);
    expect(topBottun).toBeInTheDocument();
    expect(onClickHome).toHaveBeenCalledTimes(1);
    expect(onCloseMenuDrawer).toHaveBeenCalledTimes(1);
  });
});
describe('絶景一覧ボタンのテスト', () => {
  test('絶景一覧ボタンが表示されていること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const allPlaceButton = screen.getByRole('button', {name: /絶景一覧/});
    expect(allPlaceButton).toBeInTheDocument();
  });
  test('絶景一覧ボタン押下でonClickAllPlaces関数とonCloseMenuDrawer関数が呼び出されること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const allPlaceButton = screen.getByRole('button', {name: /絶景一覧/});
    userEvent.click(allPlaceButton);
    expect(onClickAllPlaces).toHaveBeenCalledTimes(1);
    expect(onCloseMenuDrawer).toHaveBeenCalledTimes(1);
  });
});
describe('ログインボタンのテスト', () => {
  test('ログインボタンが表示されていること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const loginButton = screen.getByRole('button', {name: /ログイン/});
    expect(loginButton).toBeInTheDocument();
  });
  test('ログインボタン押下でonClickLogin関数とonCloseMenuDrawer関数が呼び出されること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const loginButton = screen.getByRole('button', {name: /ログイン/});
    userEvent.click(loginButton);
    expect(onClickLogin).toHaveBeenCalledTimes(1);
    expect(onCloseMenuDrawer).toHaveBeenCalledTimes(1);
  });
});
describe('新規登録ボタンのテスト', () => {
  test('新規登録ボタンが表示されていること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const signUpBottun = screen.getByRole('button', {name: /新規登録/});
    expect(signUpBottun).toBeInTheDocument();
  });
  test('新規登録ボタン押下でonClickSignup関数とonCloseMenuDrawer関数g呼び出されること', () => {
    const onClickHome = jest.fn();
    const onClickAllPlaces = jest.fn();
    const onClickLogin = jest.fn();
    const onClickSignup = jest.fn();
    const onCloseMenuDrawer = jest.fn();

    const {debug} = render(
      <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
        onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
    );
    const signUpBottun = screen.getByRole('button', {name: /新規登録/});
    userEvent.click(signUpBottun);
    expect(onClickSignup).toHaveBeenCalledTimes(1);
    expect(onCloseMenuDrawer).toHaveBeenCalledTimes(1);
    debug()
  });
  // describe('閉じるボタンのテスト', () => {
  //   const onClickHome = jest.fn();
  //   const onClickAllPlaces = jest.fn();
  //   const onClickLogin = jest.fn();
  //   const onClickSignup = jest.fn();
  //   const onCloseMenuDrawer = jest.fn();

  //   const {debug} = render(
  //     <MenuDrawer isOpenMenuDrawer={true} onCloseMenuDrawer={onCloseMenuDrawer} onClickHome={onClickHome}
  //       onClickLogin={onClickLogin} onClickSignup={onClickSignup} onClickAllPlaces={onClickAllPlaces} />
  //   );
  //   // const CloseButton = screen.getByRole('button', {name: /Cl/});
  //   const closeButton = screen.getByAltText("Close")
  // });
});
