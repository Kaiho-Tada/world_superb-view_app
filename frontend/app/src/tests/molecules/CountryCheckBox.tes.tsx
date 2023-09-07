import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { CountryCheckBox } from "components/molecules/CountryCheckBox";
import { PlaceProvider } from "hooks/provider/useTestPlaceProvider";
import userEvent from "@testing-library/user-event";
import { CheckBoxLabelProvider } from "hooks/provider/useCheckBoxLabelProvider";

const countryState = "アジア";

test("Checkboxが表示されていること", ()  => {
  const {debug} = render(
    <PlaceProvider>
      <CheckBoxLabelProvider>
        <CountryCheckBox countryState={countryState} />
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
        <CountryCheckBox countryState={countryState} />
      </CheckBoxLabelProvider>
    </PlaceProvider>
  );
  debug()
  const checkBox = screen.getByRole("checkbox");
  userEvent.click(checkBox);
  expect(checkBox).toBeChecked();
})
