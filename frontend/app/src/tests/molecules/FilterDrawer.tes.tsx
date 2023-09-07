import { MenuIconButton } from "components/atoms/button/MenuIconButton";
import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { FilterDrawer } from "components/molecules/FilterDrawer";

test('drawerが表示されていること', () => {
  const {debug} = render(
    <FilterDrawer />
  );
  const drawer = screen.getByRole("drawer");
})
