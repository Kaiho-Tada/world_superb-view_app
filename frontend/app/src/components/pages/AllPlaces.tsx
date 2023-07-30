import { Center, Flex, Spinner, Wrap, WrapItem, useDisclosure, Box, Button, FilterDrawer, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import { FC, memo, useState, useEffect, useCallback } from "react";
import { useMessage } from "hooks/useMessage"

import { PlaceAll } from "lib/api/place";
import { PlaceCard } from "components/organisms/place/PlaceCard";
import { Places } from "types/place";
import { GenreCheckBox } from "components/molecules/GenreCheckBox";
import { CountryCheckBox } from "components/molecules/CountryCheckBox";
import { TypeCheckBox } from "components/molecules/TypeCheckBox";

export const AllPlaces: FC = memo(() => {

  const [places, setPlaces] = useState<Array<Places>>([])
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()

  const getPlaces = async () => {
    setLoading(true)
    const res = await PlaceAll()
    console.log(res)

    if (res.status === 200) {
      setPlaces(res.data)
    }else {
      showMessage({title: "ユーザー取得に失敗しました", status: "error"})
    }
    setLoading(false)
  }

  useEffect(() => {getPlaces()}, [])

  const onClickClear = useCallback(() => {
    const newGenres = genres.map(genre => {
      genre.checked = false
      return genre
    })
    setGenres(newGenres)

    const newCountries = countries.map(country => {
      country.checked = false
      return country
    })
    setCountries(newCountries)

    const newTypes = types.map(type => {
      type.checked = false
      return type
    })
    setTypes(newTypes)

    getPlaces()
  }, [])


  const [genres, setGenres] = useState([
    { label: "滝", category:"自然", place_names: ["ヴィクトリアの滝", "セリャラントスフォス", "クアンシーの滝", "イグアスの滝", "エンジェルフォール", "プリトヴィッツェ湖群国立公園",
    "ヘネラル・カレーラ湖"], checked: false},
    { label: "湖", category:"自然", place_names: ["バイカル湖", "ブレッド湖", "テカポ湖", "アブラハム湖", "レイク・ルイーズ", "プリトヴィッツェ湖群国立公園", "ラック・ローズ"], checked: false},
    { label: "砂漠", category:"自然", place_names: ["デットフレイ", "モニュメントバレー", "サハラ砂漠"], checked: false},
    { label: "岩山", category:"自然", place_names: ["トロルの舌", "ドロミテ渓谷", "ミルフォードサウンドフィヨルド", "ブルーマウンテンズ", "エアーズロック", "モニュメントバレー", "ザウェーブ", "カセドラルロック", "メテオラ修道院", "シーギリヤ"], checked: false},
    { label: "地層", category:"自然", place_names: ["ザウェーブ", "プライスキャニオン国立公園"], checked: false},
    { label: "温泉", category:"自然", place_names: ["ヒエラポリス-パムッカレ", "ゲイシール"], checked: false},
    { label: "フィヨルド", category:"自然", place_names: ["リーセフィヨルド", "ミルフォードサウンドフィヨルド"], checked: false},
    { label: "崖", category:"自然", place_names: ["リーセフィヨルド", "トロルの舌", "ブルーマウンテンズ", "ホースシューベンド", "スワローズネスト", "メテオラ修道院", "セブンシスターズ"], checked: false},
    { label: "丘", category:"自然", place_names: ["チョコレートヒルズ", "サルベーションマウンテン", "セブンシスターズ"], checked: false},
    { label: "草原", category:"自然", place_names: ["チョコレートヒルズ", "エアーズロック", "セブンカラードアース"], checked: false},
    { label: "海岸", category:"自然", place_names: ["ナヴァイオビーチ", "ペトラトゥロミウ海岸", "ケーブルビーチ", "バラデロ", "フェルナンド・デ・ノローニャ", "ホワイトヘブンビーチ", "エルニド"], checked: false},
    { label: "氷河", category:"自然", place_names: ["バトナ氷河", "ロス・グラシアレス国立公園", "グラシアル・ペリート・モレノ"], checked: false},
    { label: "公園", category:"自然", place_names: ["プライスキャニオン国立公園", "レンソイス国立公園", "ホワイトサンズ国立公園", "グランドキャニオン国立公園", "プリトヴィッツェ湖群国立公園", "ロス・グラシアレス国立公園"], checked: false},
    { label: "渓谷", category:"自然", place_names: ["ドロミテ渓谷", "アンテロープキャニオン", "プライスキャニオン国立公園", "グランドキャニオン国立公園"], checked: false},
    { label: "塩湖", category:"自然", place_names: ["パンゴン湖", "ウユニ塩湖"], checked: false},
    { label: "川", category:"自然", place_names: ["ホースシューベンド"], checked: false},
    { label: "山", category:"自然", place_names: ["ヴィニクンカ山", "ドロミテ渓谷", "ミルフォードサウンドフィヨルド", "ブルーマウンテンズ", "マッターホルン"], checked: false},
    { label: "洞窟", category:"自然", place_names: ["蘆笛岩", "マテーラの洞窟住居", "グロッタ・アズッラ", "グランセノーテ", "ワイトモ洞窟"], checked: false},
    { label: "砂丘", category:"自然", place_names: ["ホワイトサンズ国立公園"], checked: false},
    { label: "湿地", category:"自然", place_names: ["高美湿地"], checked: false},
    { label: "火山", category:"自然", place_names: ["イジェン火山"], checked: false},
    { label: "泉", category:"自然", place_names: ["グランセノーテ"], checked: false},
    { label: "都市", category:"人工", place_names: ["ルクソール", "チヴィタディバニョレージョ", "ペトラ遺跡", "マチュピチュ"], checked: false},
    { label: "遺跡", category:"人工", place_names: ["万里の長城", "アンコールワット", "シュエサンドーパゴダ", "ルクソール","ラリベラ岩窟教会群", "アイトベンハドゥ", "ストーンヘンジ", "バッカス寺院",
      "ペトラ遺跡", "マチュピチュ", "ヒエラポリス-パムッカレ", "シーギリヤ"], checked: false},
    { label: "廃墟", category:"人工", place_names: ["ヒエラポリス-パムッカレ"], checked: false},
    { label: "礼拝堂", category:"人工", place_names: ["シェイクザビードグランドモスク"], checked: false},
    { label: "寺院", category:"人工", place_names: ["アンコールワット", "シュエサンドーパゴダ", "バッカス寺院", "シェイクザビードグランドモスク"], checked: false},
    { label: "アート", category:"人工", place_names: ["サルベーションマウンテン"], checked: false},
    { label: "教会", category:"人工", place_names: ["ラリベラ岩窟教会群", "ハットルグリムス教会"], checked: false},
    { label: "城", category:"人工", place_names: ["万里の長城", "アイトベンハドゥ", "ノイシュバンシュタイン城", "スワローズネスト", "シーギリヤ"], checked: false},
    { label: "橋", category:"人工", place_names: ["スタリモスト橋"], checked: false},
    { label: "修道院", category:"人工", place_names: ["モン・サン・ミシェル", "メテオラ修道院"], checked: false},
    { label: "住居", category:"人工", place_names: ["マテーラの洞窟住居"], checked: false}
  ])

  const genre_categories = [ "自然", "人工" ]

  const [countries, setCountries] = useState([
    { label: "ナミビア", state:"アフリカ", place_names: ["デットフレイ"], checked: false},
    { label: "ザンビア", state:"アフリカ", place_names: ["ヴィクトリアの滝"], checked: false},
    { label: "エジプト", state:"アフリカ", place_names: ["ルクソール"], checked: false},
    { label: "エチオピア", state:"アフリカ", place_names: ["ラリベラ岩窟教会群"], checked: false},
    { label: "モロッコ", state:"アフリカ", place_names: ["アイトベンハドゥ", "サハラ砂漠"], checked: false},
    { label: "モーリシャス", state:"アフリカ", place_names: ["セブンカラードアース"], checked: false},
    { label: "セネガル", state:"アフリカ", place_names: ["ラック・ローズ"], checked: false},
    { label: "イタリア", state:"ヨーロッパ", place_names: ["チヴィタディバニョレージョ", "ドロミテ渓谷", "マテーラの洞窟住居", "グロッタ・アズッラ"], checked: false},
    { label: "アイスランド", state:"ヨーロッパ", place_names: ["セリャラントスフォス", "ハットルグリムス教会", "バトナ氷河", "ゲイシール"], checked: false},
    { label: "ノルウェー", state:"ヨーロッパ", place_names: ["リーセフィヨルド", "トロルの舌"], checked: false},
    { label: "フランス", state:"ヨーロッパ", place_names: ["モン・サン・ミシェル"], checked: false},
    { label: "イギリス", state:"ヨーロッパ", place_names: ["ストーンヘンジ", "セブンシスターズ"], checked: false},
    { label: "ロシア", state:"ヨーロッパ", place_names: ["バイカル湖"], checked: false},
    { label: "ウクライナ", state:"ヨーロッパ", place_names: ["スワローズネスト"], checked: false},
    { label: "ボスニアヘルツェゴビナ", state:"ヨーロッパ", place_names: ["スタリモスト橋"], checked: false},
    { label: "ギリシャ", state:"ヨーロッパ", place_names: ["ナヴァイオビーチ", "メテオラ修道院"], checked: false},
    { label: "ドイツ", state:"ヨーロッパ", place_names: ["ノイシュバンシュタイン城"], checked: false},
    { label: "スロベニア", state:"ヨーロッパ", place_names: ["ブレッド湖"], checked: false},
    { label: "スイス", state:"ヨーロッパ", place_names: ["マッターホルン"], checked: false},
    { label: "クロアチア", state:"ヨーロッパ", place_names: ["プリトヴィッツェ湖群国立公園"], checked: false},
    { label: "アラブ首長国連邦", state:"中東", place_names: ["シェイクザビードグランドモスク"], checked: false},
    { label: "レバノン", state:"中東", place_names: ["バッカス寺院"], checked: false},
    { label: "ラオス", state:"中東", place_names: ["クアンシーの滝"], checked: false},
    { label: "ヨルダン", state:"中東", place_names: ["ペトラ遺跡", "ペトラトゥロミウ海岸"], checked: false},
    { label: "トルコ", state:"中東", place_names: ["ヒエラポリス-パムッカレ"], checked: false},
    { label: "フィリピン", state:"アジア", place_names: ["チョコレートヒルズ", "エルニド"], checked: false},
    { label: "中国", state:"アジア", place_names: ["蘆笛岩", "万里の長城"], checked: false},
    { label: "カンボジア", state:"アジア", place_names: ["アンコールワット"], checked: false},
    { label: "ミャンマー", state:"アジア", place_names: ["シュエサンドーパゴダ"], checked: false},
    { label: "インド", state:"アジア", place_names: ["パンゴン湖"], checked: false},
    { label: "スリランカ", state:"アジア", place_names: ["シーギリヤ"], checked: false},
    { label: "ニュージーランド", state:"オセアニア", place_names: ["ミルフォードサウンドフィヨルド", "テカポ湖" , "ワイトモ洞窟"], checked: false},
    { label: "オーストラリア", state:"オセアニア", place_names: ["ケーブルビーチ", "ブルーマウンテンズ", "エアーズロック", "ホワイトヘブンビーチ"], checked: false},
    { label: "アメリカ", state:"北米", place_names: ["モニュメントバレー", "アンテロープキャニオン", "サルベーションマウンテン", "ザウェーブ",
    "カセドラルロック", "プライスキャニオン国立公園", "ホースシューベンド", "ホワイトサンズ国立公園","グランドキャニオン国立公園"], checked: false},
    { label: "キューバ", state:"北米", place_names: ["バラデロ"], checked: false},
    { label: "メキシコ", state:"北米", place_names: ["チェチェンイッツァ", "グランセノーテ"], checked: false},
    { label: "アルゼンチン", state:"南米", place_names: ["イグアスの滝", "ロス・グラシアレス国立公園", "グラシアル・ペリート・モレノ"], checked: false},
    { label: "ボリビア", state:"南米", place_names: ["ウユニ塩湖"], checked: false},
    { label: "ペルー", state:"南米", place_names: ["ヴィニクンカ山", "マチュピチュ"], checked: false},
    { label: "ブラジル", state:"南米", place_names: ["レンソイス国立公園", "フェルナンド・デ・ノローニャ"], checked: false},
    { label: "ベネズエラ", state:"南米", place_names: ["エンジェルフォール"], checked: false}
  ])

  const country_states = [ "アフリカ", "ヨーロッパ", "中東", "アジア", "オセアニア", "北米", "南米" ]

  const [types, setTypes] = useState([
    { label: "歴史・文化的", place_names: ["アイトベンハドゥ", "チヴィタディバニョレージョ", "マテーラの洞窟住居", "ストーンヘンジ",
      "スワローズネスト", "スタリモスト橋", "ヒエラポリス-パムッカレ", "万里の長城", "シーギリヤ", "マチュピチュ"], checked: false
    },
    { label: "雄大", place_names: ["デットフレイ", "ヴィクトリアの滝", "サハラ砂漠", "セリャラントスフォス", "イジェン火山", "ミルフォードサウンドフィヨルド",
      "ザウェーブ", "プライスキャニオン国立公園", "イグアスの滝", "グラシアル・ペリート・モレノ"], checked: false
    },
    { label: "荘厳", place_names: ["ルクソール", "マチュピチュ", "メテオラ修道院", "モン・サン・ミシェル"], checked: false
    },
    { label: "幻想・神秘的", place_names: ["チヴィタディバニョレージョ", "マテーラの洞窟住居", "モン・サン・ミシェル", "メテオラ修道院",
      "ブレッド湖", "万里の長城", "シーギリヤ", "ホースシューベンド", "マチュピチュ", "エンジェルホール"], checked: false
    },
    { label: "癒し", place_names: ["スワローズネスト", "ノイシュバンシュタイン城", "サルベーションマウンテン", "レンソイス国立公園"],
      checked: false
    },
    { label: "ロマンチック", place_names: ["モン・サン・ミシェル", "スワローズネスト", "ノイシュバンシュタイン城", "ブレッド湖", "レンソイス国立公園"],
     checked: false
    },
    { label: "畏怖", place_names: ["メテオラ修道院", "シーギリヤ", "モン・サン・ミシェル"],
      checked: false
    },
    { label: "芸術", place_names: ["蘆笛岩", "サルベーションマウンテン"],
      checked: false
    },
    { label: "奇妙・不思議", place_names: ["トロルの舌", "ストーンヘンジ", "メテオラ修道院", "蘆笛岩", "シーギリヤ", "マチュピチュ",
      "エンジェルホール"],
      checked: false
    },
    { label: "耽美", place_names: ["ドロミテ渓谷", "リーセフィヨルド", "ヒエラポリス-パムッカレ", "ホワイトサンズ国立公園", "レイク・ルイーズ",
      "ロス・グラシアレス国立公園", "ウユニ塩湖", "レンソイス国立公園", "ヘネラル・カレーラ湖"], checked: false
    },
  ])

  return (
    <>
      {loading ? (
        <Center h="90vh">
          <Spinner />
        </Center>
      ) :(
        <Flex py={{base: 6, md: 10, lg: 12}} px={{base: 3, md: 6, lg: 10}} bg="black">
          <Accordion allowMultiple w={{md: "25%", lg: "20%"}} display={{ base: "none", md: "block"}} pr={6} color="white">
            <Box as="span" flex='1' p="4" color="gray" fontWeight="bold" fontSize="lg" >
             絞り込み
            </Box>
            <Box as="button" color="blue.500" fontSize="sm" onClick={onClickClear} textAlign="right">
             クリア
            </Box>
            <AccordionItem mt="2">
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    ジャンル
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Accordion allowMultiple>
                  {
                    genre_categories.map((genre_category) => (
                      <AccordionItem mt="2">
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                              {genre_category}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <GenreCheckBox setPlaces={setPlaces} genre_category={genre_category} genres={genres} setGenres={setGenres}
                            countries={countries} types={types} />
                        </AccordionPanel>
                      </AccordionItem>
                    ))
                  }
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    地域
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Accordion allowMultiple>
                  {
                    country_states.map((country_state) => (
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                              {country_state}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <CountryCheckBox setPlaces={setPlaces} country_state={country_state} countries={countries} setCountries={setCountries}
                            genres={genres} types={types} />
                        </AccordionPanel>
                      </AccordionItem>
                    ))
                  }
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    属性
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TypeCheckBox setPlaces={setPlaces} types={types} setTypes={setTypes} genres={genres} countries={countries} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Wrap w={{md: "75%", lg: "80%"}}>
            {places.map((place) => (
              <WrapItem key={place.id}>
                <PlaceCard imageUrl={place.imageUrl} name={place.name} countries={place.countries}/>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      )}
    </>
  )
})
