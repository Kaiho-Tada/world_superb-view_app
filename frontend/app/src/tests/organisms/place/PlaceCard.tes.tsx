import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { PlaceCard } from "components/organisms/place/PlaceCard";

const imageUrl = "imageUrl";
const name = "バイカル湖";
const countries1 = [
  {
    id: 1,
    name: "ロシア",
    stateId: 1,
    state: {
      id: 1,
      name: "ヨーロッパ",
    },
    riskLevel: 4,
  }
];

test('絶景画像が表示されていること', () => {
  const {debug} = render(<PlaceCard imageUrl={imageUrl} name={name} countries={countries1} />)
  const image = screen.getByAltText(/絶景画像/);
  expect(image).toBeInTheDocument();

});

test('絶景名が表示されていること', () => {
  const {debug} = render(<PlaceCard imageUrl={imageUrl} name={name} countries={countries1} />)
  const placeName = screen.getByRole("heading", {name: "バイカル湖"});
  expect(placeName).toBeInTheDocument();
});

test('国名が表示されていること', () => {
  const {debug} = render(<PlaceCard imageUrl={imageUrl} name={name} countries={countries1} />)
  const countryName = screen.getByText(/ロシア/);
  expect(countryName).toBeInTheDocument();
});

test('starイメージが表示されていること', () => {
  const {debug} = render(<PlaceCard imageUrl={imageUrl} name={name} countries={countries1} />)
  const images = screen.getAllByAltText(/リスクレベルスター/);
  expect(images).toHaveLength(4);
  debug()
});

test('BMI指数が表示されていること', () => {
  const {debug} = render(<PlaceCard imageUrl={imageUrl} name={name} countries={countries1} />)
  const BMIText = screen.getByText(/BMI指数/);
  expect(BMIText).toBeInTheDocument();
  debug()
});

// test('BMI指数の値が表示されていること', () => {
//   const {debug} = render(<PlaceCard imageUrl={imageUrl} name={name} countries={countries1} />)
//   const images = screen.getAllByAltText(/リスクレベルスター/);
//   expect(images).toHaveLength(4);
//   debug()
// });
