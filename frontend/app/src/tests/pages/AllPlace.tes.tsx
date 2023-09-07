import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from "hooks/provider/useAuthProvider";
import axios from "axios";
import { AllPlaces } from "components/pages/AllPlaces";
// const mock = new MockAdapter(axios);
// mock.onPost(`http://localhost:3001/api/v1/auth/sign_in`);
import MockAdapter from 'axios-mock-adapter';
import client from "lib/api/client";
import ReactDOM from 'react-dom/client';
import userEvent from "@testing-library/user-event";
import { createMemoryRouter } from "react-router-dom";
import { PlacesDetailPage } from "components/pages/PlacesDetailPage";

// let container;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

afterEach(() => {
  // document.body.removeChild(container);
  // container = null;
  mockAxios.resetHistory()
});

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

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
).onGet('/genres').reply(200,
  [
    {
      id: 11,
      name: "洞窟",
      category: "自然",
      places: [
        { id: 2, name: "マテーラの洞窟住居" }
      ],
    },
    {
      id: 24,
      name: "都市",
      category: "人工",
      places: [
        { id: 9, name: "チヴィタディバニョレージョ" },
        { id: 73, name: "マチュピチュ" },
      ],
    }
  ]
).onGet('/countries').reply(200,
  [
    {
      id: 14,
      name: "ペルー",
      places: [
        { id: 73, name: "マチュピチュ" }
      ],
      riskLevel: 0,
      state: { id: 4, name: "中南米" },
      stateId: 1
    },
    {
      id: 24,
      name: "イタリア",
      places: [
        { id: 9, name: "チヴィタディバニョレージョ" },
        { id: 2, name: "マテーラの洞窟住居" }
      ],
      riskLevel: 0,
      state: { id: 5, name: "ヨーロッパ"},
      stateId: 1
    }
  ]
).onGet('/types').reply(200,
  [
    {
      id: 1,
      name: "歴史・文化的",
      places: [
        { id: 73, name: "マチュピチュ" },
        { id: 2, name: "マテーラの洞窟住居" }
      ]
    },
    {
      id: 4,
      name: "幻想・神秘的",
      places: [
        { id: 9, name: "チヴィタディバニョレージョ" },
      ]
    },
  ]
).onGet('/places/search').reply(200,
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
);

describe('絞り込みボタンのテスト', () => {
  test('絞り込みボタンが表示されていること', async () => {
    const {debug, container} = render(
      <AuthProvider>
        <BrowserRouter>
          <AllPlaces />
        </BrowserRouter>
      </AuthProvider>
    );
    const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
    expect(FilterButton).toBeInTheDocument();
  });

  test('絞り込みボタン押下でFilterDrawerが表示されること', async () => {
    const user = userEvent
    const {debug, container} = render(
      <AuthProvider>
        <BrowserRouter>
          <AllPlaces />
        </BrowserRouter>
      </AuthProvider>
    );
    const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
    await user.click(FilterButton)
    const FilterAccordion = await screen.findByRole('accordion');
    expect(FilterAccordion).toBeInTheDocument();
  });
});

describe('FilterAccordionコンポーネントの動作確認', () => {

  // test('FilterAccordionが表示されていること', async () => {
  //   const {debug, container} = render(
  //     <AuthProvider>
  //       <BrowserRouter>
  //         <AllPlaces />
  //       </BrowserRouter>,
  //     </AuthProvider>,
  //   );
  //   const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
  //   await userEvent.click(FilterButton)

  //   const FilterAccordion = await screen.findByRole('accordion');
  //   expect(FilterAccordion).toBeInTheDocument();
  // })

  test('アコーディオンの見出しが表示されてること', async () => {
    const {debug, container} = render(
      <AuthProvider>
        <BrowserRouter>
          <AllPlaces />
        </BrowserRouter>
      </AuthProvider>
    );
    const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
    await userEvent.click(FilterButton)

    const AccordionHeading = await screen.findByRole('heading', {name: "絞り込み"});
    // const AccordionHeading = await screen.findByText('絞り込み');
    expect(AccordionHeading).toBeInTheDocument();
    const ClearButton = await screen.findByRole('button', { name: "クリア"});
    expect(ClearButton).toBeInTheDocument();
  });

  describe('キーワードAccordionのテスト', () => {
    test('キーワードAccordionのヘッダーが表示されていること', async() => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const KeywordAccordionHeader = await screen.findByText('キーワード');
      expect(KeywordAccordionHeader).toBeInTheDocument();
    });

    test('キーワード記入欄が表示されていること', async() => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const KeywordForm = await screen.findByPlaceholderText('絶景名または国名で検索');
      expect(KeywordForm).toBeInTheDocument();
    })
  })

  describe('ジャンルAccordionのテスト', () => {
    test('ジャンルAccordionのヘッダーが表示されていること', async () => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const GenreAccordionHeader = await screen.findByText('ジャンル');
      expect(GenreAccordionHeader).toBeInTheDocument();
      const NaturalAccordionHeader = await screen.findByText('自然');
      expect(NaturalAccordionHeader).toBeInTheDocument();
      const ArtificialAccordionHeader = await screen.findByText('人工');
      expect(ArtificialAccordionHeader).toBeInTheDocument();
    })
    test('ジャンルのチェックボックスが表示されていること', async () => {
      const user = userEvent
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const GenreCheckboxCave = await screen.findByLabelText('洞窟');
      expect(GenreCheckboxCave).toBeInTheDocument();
      const GenreCheckboxCity = await screen.findByLabelText('都市');
      expect(GenreCheckboxCity).toBeInTheDocument();
      // await user.click(GenreCheckboxCave);
    })
  })

  describe('カントリーAccordionのテスト', () => {
    test('カントリーAccordionのヘッダーが表示されていること', async () => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const AreaAccordionHeader = await screen.findByText('地域');
      expect(AreaAccordionHeader).toBeInTheDocument();
      const AsiaAccordionHeader = await screen.findByText('アジア');
      expect(AsiaAccordionHeader).toBeInTheDocument();
      const OceaniaAccordionHeader = await screen.findByText('大洋州');
      expect(OceaniaAccordionHeader).toBeInTheDocument();
      const NorthAmericaAccordionHeader = await screen.findByText('北米');
      expect(NorthAmericaAccordionHeader).toBeInTheDocument();
      const LatinAmericaAccordionHeader = await screen.findByText('中南米');
      expect(LatinAmericaAccordionHeader).toBeInTheDocument();
      const EuropeAccordionHeader = await screen.findByText('ヨーロッパ');
      expect(EuropeAccordionHeader).toBeInTheDocument();
      const MiddleEastAccordionHeader = await screen.findByText('中東');
      expect(MiddleEastAccordionHeader).toBeInTheDocument();
      const AfricaAccordionHeader = await screen.findByText('アフリカ');
      expect(AfricaAccordionHeader).toBeInTheDocument();
    })
    test('カントリーのチェックボックスが表示されるていること', async () => {
      const user = userEvent
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const GenreCheckboxItaly = await screen.findByLabelText('イタリア');
      expect(GenreCheckboxItaly).toBeInTheDocument();
      const GenreCheckboxPeru = await screen.findByLabelText('ペルー');
      expect(GenreCheckboxPeru).toBeInTheDocument();
    })
  })

  describe('タグAccordionのテスト', () => {
    test('タグAccordionのヘッダーが表示されていること', async () => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const TagAccordionHeader = await screen.findByText('属性');
      expect(TagAccordionHeader).toBeInTheDocument();

    })
    test('タグのチェックボックスが表示されていること', async () => {
      const user = userEvent
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const GenreCheckboxHistory = await screen.findByLabelText('歴史・文化的');
      expect(GenreCheckboxHistory).toBeInTheDocument();
      const GenreCheckboxFantasy = await screen.findByLabelText('幻想・神秘的');
      expect(GenreCheckboxFantasy).toBeInTheDocument();
      // await user.click(GenreCheckboxHistory);
    })
  })

  describe('リスクAccordionのテスト', () => {
    test('リスクAccordionのヘッダーが表示されていること', async () => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      const RiskAccordionHeader = await screen.findByText('危険度');
      expect(RiskAccordionHeader).toBeInTheDocument();
    })
    test('リスクのラジオボタンが表示されていること', async () => {
      const {debug, container} = render(
        <AuthProvider>
          <BrowserRouter>
            <AllPlaces />
          </BrowserRouter>
        </AuthProvider>
      );
      const FilterButton = await screen.findByRole('button', { name: "絞り込み"});
      await userEvent.click(FilterButton)

      // const RiskAccordionHeader = await screen.findByRole('radio');
      // debug(RiskAccordionHeader)
      // debug()
      // expect(RiskAccordionHeader).toBeInTheDocument();
    })
    // test('危険度のチェックボックス押下でその危険度を持つviewが表示されること', async () => {
    //   const user = userEvent
    //   const {debug, container} = render(
    //     <AuthProvider>
    //       <BrowserRouter>
    //         <AllPlaces />
    //       </BrowserRouter>,
    //     </AuthProvider>,
    //   );
    // })
  })
})



describe('view一覧のテスト', () => {
  test('view一覧が取得できていること', async () => {
    const {debug, container} = render(
      <AuthProvider>
        <BrowserRouter>
          <AllPlaces />
        </BrowserRouter>
      </AuthProvider>
    );
    const ViewImages = await screen.findAllByRole('img', {name: "絶景画像"})
    // expect(ViewImages).toBeInTheDocument();
    const ViewNameMachuPicchu = await screen.findByText('マチュピチュ');
    expect(ViewNameMachuPicchu).toBeInTheDocument();
    const ViewNameCivitaDiBagnoregio = await screen.findByText('チヴィタディバニョレージョ');
    expect(ViewNameCivitaDiBagnoregio).toBeInTheDocument();
    const ViewNameMateraCaveDwellings = await screen.findByText('マテーラの洞窟住居');
    expect(ViewNameMateraCaveDwellings).toBeInTheDocument();
    // const CountryNameItaly = await screen.findAllByRole('paragraph');
    debug()
  })
  test('view押下で絶景詳細ページに遷移すること', async () => {
    const {debug, container} = render(
      <AuthProvider>
        <BrowserRouter>
          <AllPlaces />
        </BrowserRouter>
      </AuthProvider>
    );

    const ViewNameMachuPicchu = await screen.findByText('マチュピチュ');
    await userEvent.click(ViewNameMachuPicchu)
    expect(mockedNavigator).toHaveBeenCalledWith("/places/" + 73);
  })
})

// const router = createMemoryRouter(
//   [
//     {
//       path: "/places/73",
//       element: <PlacesDetailPage />,
//     },
//   ],
//   { initialEntries: ["/places"] }
// );

// describe('絶景詳細ページのテスト', () => {
//   const {debug} =render(
//     <BrowserRouter router={router}>
//       <AllPlaces/>
//     </BrowserRouter>
//   )
//   test('テスト', async () => {
//     const ViewNameMachuPicchu = await screen.findByText('マチュピチュ');
//     // const ViewNameMachuPicchu = await screen.findByRole('heading', {name: 'マチュピチュ'})
//     await userEvent.click(ViewNameMachuPicchu)
//     await waitFor(() => {
//       const CountryHeading = screen.findByText("国名");
//       expect(CountryHeading).toBeInTheDocument();
//     })
//   })
// })








































// test("外部データ取得後", async () => {
  // await act(async () => {
  //   const {debug} = render(
  //     <AuthProvider>
  //       <BrowserRouter>
  //         <AllPlaces />
  //       </BrowserRouter>,
  //     </AuthProvider>,
  //   );
  // });

  // const {debug, container} = render(
  //   <AuthProvider>
  //     <BrowserRouter>
  //       <AllPlaces />
  //     </BrowserRouter>,
  //   </AuthProvider>,
  // );
  // const filterAccordion = await screen.findByRole('accordion');
  // expect(filterAccordion).toBeInTheDocument();

  // アコーディオンのテスト

  // const CategoryAccordionButton = await screen.findByRole('generic', { name: "カテゴリー"});













  // const CounrtyNameItaly = await screen.findByText('イタリア');
  // const CounrtyNameItaly = await container.querySelector('p');

  // expect(CounrtyNameItaly).toBeInTheDocument();
  // const GenreCheckboxPeru = await screen.findByLabelText('ペルー');
  // expect(GenreCheckboxPeru).toBeInTheDocument();

    // debug(CountryNameItaly)

  // const s = await screen.findByText('ジャンル');


  // const checkbox = await screen.findAllByRole('checkbox');





  // const CategoryAccordionButton = await screen.findByRole('heading1');
  // expect(CategoryAccordionButton).toBeInTheDocument();





// })


test('外部データ取得中', () => {
  const {debug, container} = render(
    <AuthProvider>
      <BrowserRouter>
        <AllPlaces />
      </BrowserRouter>
    </AuthProvider>
  )
  const loadingSpinner = screen.getByRole('spinner');
  expect(loadingSpinner).toBeInTheDocument();
})

// const mockApi = jest.fn().mockName('mock-api');
// jest.mock("axios", () => ({
//   __esModule: true,
//   default: {
//     create: jest.fn(() => {
//       return {
//         interceptors: {
//           request: { use: jest.fn() },
//           response: { use: jest.fn() },
//         },
//         post: mockApi,
//       };
//     }),
//   },
// }))

// const createMock = axios.create({
//   baseURL: 'http://localhost:3001/api/v1',
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // },
//   // responseType: 'json',
// })
// jest.spyOn(axios, 'create').mockReturnValue(createMock)
// const axiosGetSpy = jest.spyOn(createMock, 'get')

// const axiosGetSpy = jest.spyOn(client, 'get')
// test('外部データ取得後', () => {
//   beforeEach(() => {
//     axiosGetSpy.mockResolvedValue({ response: {
//       data: [
//         {
//           id: 1,
//           name: "デットフレイ",
//           countries: { id: 47, name: "ナミビア", riskLevel: 1 },
//           imageUrl: "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2156d0bfd97f07e2888b6c5f2eaf326e2be25e06/%E3%83%87%E3%83%83%E3%83%88%E3%83%95%E3%83%AC%E3%82%A4.avif"
//         },
//         {
//           id: 2,
//           name: "ヴィクトリアの滝",
//           countries: [
//             { id: 47, name: "ザンビア", riskLevel: 1 },
//             { id: 38, name: "エルニド", riskLevel: 2 }
//           ],
//           imageUrl: "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2156d0bfd97f07e2888b6c5f2eaf326e2be25e06/%E3%83%87%E3%83%83%E3%83%88%E3%83%95%E3%83%AC%E3%82%A4.avif"
//         }
//       ]
//     }})
//   })
//   const {debug, container} = render(
//     <AuthProvider>
//       <BrowserRouter>
//         <AllPlaces />
//       </BrowserRouter>
//     </AuthProvider>
//   )
//   const loadingSpinner = screen.getByRole('spinner');
//   expect(loadingSpinner).toBeInTheDocument();
// })


// test('外部データ取得後', async () => {

//   axios.get.mockResolvedValue({
//     data: [
//       {
//         id: 1,
//         name: "デットフレイ",
//         countries: { id: 47, name: "ナミビア", riskLevel: 1 },
//         imageUrl: "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2156d0bfd97f07e2888b6c5f2eaf326e2be25e06/%E3%83%87%E3%83%83%E3%83%88%E3%83%95%E3%83%AC%E3%82%A4.avif"
//       },
//       {
//         id: 2,
//         name: "ヴィクトリアの滝",
//         countries: [
//           { id: 47, name: "ザンビア", riskLevel: 1 },
//           { id: 38, name: "エルニド", riskLevel: 2 }
//         ],
//         imageUrl: "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2156d0bfd97f07e2888b6c5f2eaf326e2be25e06/%E3%83%87%E3%83%83%E3%83%88%E3%83%95%E3%83%AC%E3%82%A4.avif"
//       }
//     ]
//   })

//   axios.get.mockResolvedValue({
//     data: [
//       {
//         id: 1,
//         name: "滝",
//         category: "自然",
//         places: [
//           { id: 2, name: "ヴィクトリアの滝" },
//           { id: 13, name: "セリャラントスフォス" }
//         ],
//       },
//       {
//         id: 31,
//         name: "城",
//         category: "人工",
//         places: [
//           { id: 40, name: "万里の長城" },
//         ],
//       }
//     ]
//   })

//   axios.get.mockResolvedValue({
//     data: [
//       {
//         id: 1,
//         name: "インドネシア",
//         places: { id: 46, name: 'イジェン火山' },
//         riskLevel: 1,
//         state: { name: "アジア" },
//         stateId: 1
//       },
//       {
//         id: 2,
//         name: "フィリピン",
//         places: [
//           { id: 46, name: 'チョコレートヒルズ' },
//           { id: 38, name: 'エルニド' }
//         ],
//         riskLevel: 2,
//         state: { name: "アジア"},
//         stateId: 1
//       }
//     ]
//   })

//   axios.get.mockResolvedValue({
//     data: [
//       {
//         id: 1,
//         name: "歴史・文化的",
//         places: [
//           { id: 5, name: 'アイトベンハドゥ' },
//           { id: 9, name: 'チヴィタディバニョレージョ' },
//         ]
//       },
//       {
//         id: 4,
//         name: "幻想・神秘的",
//         places: [
//           { id: 11, name: 'マテーラの洞窟住居' },
//           { id: 19, name: 'モン・サン・ミシェル' },
//         ]
//       },
//     ]
//   })

//   const {debug, container} = render(
//       <BrowserRouter>
//         <AllPlaces />
//       </BrowserRouter>
//   )
//   const filterAccordion = await screen.findByRole('accordion');
//   expect(filterAccordion).toBeInTheDocument();
// })
