import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { GenreCheckBox } from "components/molecules/GenreCheckBox";
import { PlaceProvider } from "hooks/provider/useTestPlaceProvider";
import userEvent from "@testing-library/user-event";
import { CheckBoxLabelProvider } from "hooks/provider/useCheckBoxLabelProvider";

const genreCategory = "自然";

test("CheckBoxが表示されていること", ()  => {
  const {debug} = render(
    <PlaceProvider>
      <CheckBoxLabelProvider>
        <GenreCheckBox genreCategory={genreCategory} />
      </CheckBoxLabelProvider>
    </PlaceProvider>
  );
  debug()
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).toBeInTheDocument();
});

test("Checkbox押下でチェックされること", ()  => {
  const {debug} = render(
    <PlaceProvider>
      <CheckBoxLabelProvider>
        <GenreCheckBox genreCategory={genreCategory} />
      </CheckBoxLabelProvider>
    </PlaceProvider>
  );
  debug()
  const checkBox = screen.getByRole("checkbox");
  userEvent.click(checkBox);
  expect(checkBox).toBeChecked();
})
