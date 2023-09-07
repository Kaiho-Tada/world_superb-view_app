import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { PlaceCardRiskStar } from "components/molecules/PlaceCardRiskStar";

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
const countries2 = [
  {
    id: 1,
    name: "ロシア",
    stateId: 1,
    state: {
      id: 1,
      name: "ヨーロッパ",
    },
    riskLevel: 4,
  },
  {
    id: 2,
    name: "フランス",
    stateId: 1,
    state: {
      id: 1,
      name: "ヨーロッパ",
    },
    riskLevel: 0,
  }
];

test("表示されている数がriskLevelと同じであること", () => {
  render(<PlaceCardRiskStar countries={countries1} />);
  const riskLevel = screen.getByRole('heading', {name: /4/});
  expect(riskLevel).toBeInTheDocument();
});

test("riskLevelと表示されているStarの個数が同じであること", () => {
  render(<PlaceCardRiskStar countries={countries1} />);
  const starImage = screen.getAllByRole('img');
  expect(starImage).toHaveLength(4);
});

test("coutriesが一つの場合、(リスクレベル)テキストが表示されていること", () => {
  render(<PlaceCardRiskStar countries={countries1} />);
  const riskLevelText = screen.getByText(/(リスクレベル)/);
  expect(riskLevelText).toBeInTheDocument();
});

test("countriesが複数の場合、より高いriskLevelが表示されること", () => {
  render(<PlaceCardRiskStar countries={countries2} />);
  const starImage = screen.getAllByRole('img');
  expect(starImage).toHaveLength(4);
});

test("countriesが複数の場合、(リスクレベルの高い方を表示)テキストが表示されていること", () => {
  render(<PlaceCardRiskStar countries={countries2} />);
  const riskLevelText = screen.getByText(/(リスクレベルの高い方を表示)/);
  expect(riskLevelText).toBeInTheDocument();
})
