import { MenuIconButton } from "components/atoms/button/MenuIconButton";
import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

describe("MenuIconButtonのテスト", () => {
  test("MenuIconButtonが表示されていること", () => {
    const onOpenMenuDrawer = jest.fn();
    render(<MenuIconButton onOpenMenuDrawer={onOpenMenuDrawer} />);
    const IconButton = screen.getByRole("button");
    expect(IconButton).toBeInTheDocument();
  });
  test("MenuIconButton押下でpropsで渡した関数が呼び出されること", () => {
    const onOpenMenuDrawer = jest.fn();
    render(<MenuIconButton onOpenMenuDrawer={onOpenMenuDrawer} />);
    const IconButton = screen.getByRole("button");
    userEvent.click(IconButton);
    expect(onOpenMenuDrawer).toHaveBeenCalledTimes(1);
  });
  // useEventListener.click()
})
