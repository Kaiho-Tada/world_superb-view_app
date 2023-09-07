import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { PlaceProvider } from "hooks/provider/useTestPlaceProvider";
import { FilterDrawerSearchBox } from "components/molecules/FilterDrawerSearchBox";

test('検索記入欄が表示されていること', () => {
  const {debug} = render(
    <PlaceProvider>
      <FilterDrawerSearchBox />
    </PlaceProvider>
  );
  debug();
  const text = screen.getByRole('textbox');
  expect(text).toBeInTheDocument();

});
test('閉じるボタンが表示されていること', () => {
  const {debug} = render(
    <PlaceProvider>
      <FilterDrawerSearchBox />
    </PlaceProvider>
  );
  debug();
  const button = screen.getByRole('icon');
  expect(button).toBeInTheDocument();
  // const button = screen.getByAltText('icon')

})
