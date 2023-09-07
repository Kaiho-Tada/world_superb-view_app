import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";

describe("PrimaryButtonのテスト", () => {
  test("PrimaryButtonが表示されていること", () => {
    const onClick = jest.fn();
    render(
      <PrimaryButton isDisabled={false} loading={false} onClick={onClick}>
        テストボタン
      </PrimaryButton>
    )
    const Button = screen.getByRole("button");
    expect(Button).toBeInTheDocument();
  });

  test("propsで受け取ったisDisabledの値がtrueの場合、ボタンクリックが無効になっていること", () => {
    const onClick = jest.fn();
    render(
      <PrimaryButton isDisabled={true} loading={false} onClick={onClick}>
        テストボタン
      </PrimaryButton>
    );
    const Button = screen.getByRole("button");
    expect(Button).toBeDisabled();
  });

  test("PrimaryButton押下でpropsで渡した関数が呼び出されること", () => {
    const onClick = jest.fn();
    render(
      <PrimaryButton isDisabled={false} loading={false} onClick={onClick}>
        テストボタン
      </PrimaryButton>
    )
    const Button = screen.getByRole("button");
    userEvent.click(Button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
