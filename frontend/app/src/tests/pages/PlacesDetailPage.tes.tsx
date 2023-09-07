// import { createMemoryHistory } from 'history'

import { render, screen, waitFor } from "@testing-library/react";
import { PlacesDetailPage } from "components/pages/PlacesDetailPage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { createMemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'
import client from "lib/api/client";
import MockAdapter from 'axios-mock-adapter';
import { act } from "react-dom/test-utils";
import ReactDOM from 'react-dom/client';
import { AllPlaces } from "components/pages/AllPlaces";
import userEvent from "@testing-library/user-event";

// const history = createMemoryRouter();
// history("/customers/1")
// console.log(history);
const mockAxios = new MockAdapter(client);
mockAxios.onGet('/places').reply(200,
  [{
    id: 73,
    name: "マチュピチュ",
    countries: [
      { id: 14, name: "ペルー", riskLevel: 0 }
    ],
  },
  {
    id: 9,
    name: "チヴィタディバニョレージョ",
    countries: [
      { id: 24, name: "イタリア", riskLevel: 0 }
    ],
  },
  {
    id: 11,
    name: "マテーラの洞窟住居",
    countries: [
      { id: 24, name: "イタリア", riskLevel: 0 }
    ],
  }]
)

const router = createMemoryRouter(
  [
    {
      path: "/places/",
      element: <PlacesDetailPage />,
    },
  ],
  { initialEntries: ["/places"] }
);

describe('絶景一覧のテスト', () => {
  test('テスト', () => {
    const {debug} =render(
    <BrowserRouter >
      <PlacesDetailPage />
    </BrowserRouter>
  )
  })
  // const {debug} =render(
  //   <BrowserRouter router={router}>
  //     <AllPlaces/>
  //   </BrowserRouter>
  // )
  // test('テスト', async () => {
  //   const ViewNameMachuPicchu = await screen.findByText('マチュピチュ');
  //   await userEvent.click(ViewNameMachuPicchu)
  // })
})
// // console.log(router.state)
// describe('絶景詳細一覧のテスト', () => {
//   // test('詳細一覧の情報が表示されていること', async () => {
//     const {debug} =render(
//       <BrowserRouter router={router}>
//         <PlacesDetailPage/>
//       </BrowserRouter>
//     )
//     console.log(router.state)
//   //   );
//   //   // await waitFor(() => {
//   //   //   expect(router.state.location.pathname).toEqual("/places/73");
//   //   // });
//   //   // expect(router.state.location.pathname).toEqual("/places/73");
//   //   debug()
//   // })
//   test('外部データ取得中', async () => {
//     const {debug} =render(
//       <BrowserRouter router={router}>
//         <PlacesDetailPage/>
//       </BrowserRouter>
//     );
//     debug()
//     // await waitFor(() => {
//       const loadingSpinner = screen.getByRole('spinner');
//       expect(loadingSpinner).toBeInTheDocument();
//     // })

//   })
//   test('詳細ページの見出しが表示されていること', async () => {
//     const router = createMemoryRouter(
//       [
//         {
//           path: "/places/73",
//           // element: <PlacesDetailPage />,
//         },
//       ],
//       // { initialEntries: ["/places/73"] }
//     );
//     const {debug} = render(
//       <BrowserRouter router={router}>
//         <PlacesDetailPage/>
//       </BrowserRouter>
//     );
//     // await waitFor(() => expect(screen.findAllByText("国名")).toBeInTheDocument());
//     // const CountryHeading = screen.findByText("国名");
//     // expect(screen.findByText("国名")).toBeInTheDocument();
//     await waitFor(() => {
//       const CountryHeading = screen.findByRole("heading", {name: "うん"});

//     //   const CountryHeading = screen.findByRole("heading", {name: "国名"});
//     // expect(CountryHeading).toBeInTheDocument();

//     })
//     debug()
//     // expect(CountryHeading).toBeInTheDocument();


//     // await waitFor(() => {
//     //   // const ViewHeading = screen.findByRole("heading", { name: "マチュピチュ"});
//     //   // expect(ViewHeading).toBeInTheDocument();
//     //   const CountryHeading = screen.findByText("国");
//     //   // expect(screen.findByText("国")).toBeInTheDocument();
//     // })

//   })
//   test('絶景の詳細情報のヘッダーが表示されていること', async () => {
//     const {debug} =render(
//       <BrowserRouter router={router}>
//         <PlacesDetailPage/>
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       // const CountryHeading = screen.findByText("国");
//       // expect(CountryHeading).toBeInTheDocument();
//       // const AreaHeading = screen.findByText("地域");
//       // expect(AreaHeading).toBeInTheDocument();
//       // const categoryHeading = screen.findByText("カテゴリー");
//       // expect(categoryHeading).toBeInTheDocument();
//       // const SeasonHeading = screen.findByText("ベストシーズン");
//       // expect(SeasonHeading).toBeInTheDocument();
//       // const RiskLevelHeading = screen.findByText("リスクレベル");
//       // expect(RiskLevelHeading).toBeInTheDocument();
//       // const BmiHeading = screen.findByText("BMI指数");
//       // expect(BmiHeading).toBeInTheDocument();
//     })
//   })
//   test('絶景の詳細情報のヘッダーが表示されていること', async () => {
//     const {debug} =render(
//       <BrowserRouter router={router}>
//         <PlacesDetailPage/>
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       // const ViewsCountryName = screen.findByText("ペルー");
//       // expect(ViewsCountryName).toBeInTheDocument();


//     })
//   })
// })
