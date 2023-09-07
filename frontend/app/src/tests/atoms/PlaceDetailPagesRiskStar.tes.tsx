import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { PlaceDetailPagesRiskStar } from "components/atoms/PlacesDetailPagesRiskStar";

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

test("RiskLevelと、表示されているStarの個数が同じであること", () => {
  // render(<RiskLevelsStar countries={Countries1} />)
  render(<PlaceDetailPagesRiskStar countries={countries1} />);
  const starImage = screen.getAllByRole('img');
  expect(starImage).toHaveLength(4);
});

test("countriesが複数の場合、より高いリスクレベルが表示されること", () => {
  render(<PlaceDetailPagesRiskStar countries={countries2} />);
  const starImage = screen.getAllByRole('img');
  expect(starImage).toHaveLength(4);
})
