import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { PlaceProvider } from "hooks/provider/useTestPlaceProvider";
import userEvent from "@testing-library/user-event";
import { CheckBoxLabelProvider } from "hooks/provider/useCheckBoxLabelProvider";
import { RiskCheckBox } from "components/molecules/RiskCheckBox";

test("CheckBoxが表示されていること", ()  => {
  const {debug} = render(
    <PlaceProvider>
      <CheckBoxLabelProvider>
        <RiskCheckBox />
      </CheckBoxLabelProvider>
    </PlaceProvider>
  );
  debug()
  const checkBoxs = screen.getAllByRole("checkbox");
  expect(checkBoxs).toHaveLength(5);
});

test("Checkbox押下でチェックされること", ()  => {
  const {debug} = render(
    <PlaceProvider>
      <CheckBoxLabelProvider>
        <RiskCheckBox />
      </CheckBoxLabelProvider>
    </PlaceProvider>
  );
  debug()
  const checkBoxs = screen.getAllByRole("checkbox");
  userEvent.click(checkBoxs[0]);
  expect(checkBoxs[0]).toBeChecked();
})
