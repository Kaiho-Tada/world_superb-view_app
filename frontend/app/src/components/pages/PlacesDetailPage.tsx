import { Box, Center, Divider, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { PlaceDetailPagesRiskStar } from "components/atoms/PlacesDetailPagesRiskStar";
import { useAllPlaces } from "hooks/api/useAllPlaces";
import { FC, memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"

const StyledDiv = styled.div`
  position: relative;
  padding-bottom: 100%;
  @media(max-width: 80em) {
    padding-bottom: 60%;
  }
`;
const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* @media(max-width: 80em) {
    left: 20;
  } */
`;
export const PlacesDetailPage: FC = memo(() => {

  const params = useParams()
  console.log(params)
  const placeId = parseInt(params["id"]!!)
  const { getPlaces, places } = useAllPlaces();

  useEffect(() => {getPlaces()}, [])

  const place = places.filter(place => place.id === placeId)[0]
  console.log(place)
  return (
    <>
      {place == undefined ? (
          <Center h="90vh" >
            <Spinner role="spinner" />
          </Center>
        ) :
        <>
          <Box mt={{base: 8, lg: 12}} mx={{base: 8, md: 14, lg:28}} bg="gray.100" p="10" textAlign="center" >
            <Heading pb={9} as="h1" size="lg" color="green.600" textShadow='1px 1px' mb="3">{place.name}</Heading>
            <Box w="100%" display={{base: "block", md: "none"}} mb="6" >
              <StyledDiv>
                <StyledIframe src={place.panoramaUrl} loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></StyledIframe>
              </StyledDiv>
            </Box>
            <Flex>
                <Box w={{ md: "80%", xl: "50%"}} display={{base: "none", md: "block"}} mr="9" >
                  <StyledDiv>
                    <StyledIframe src={place.panoramaUrl} loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></StyledIframe>
                  </StyledDiv>
                </Box>
                <Box borderRadius="10px" w={{base: "100%", md: "50%"}}>
                  {/* <Heading as="h1" size="md" textAlign="left" my={3} display={{base: "block", lg: "none"}} mt={10} pb={3}>{v.name}</Heading> */}
                  {/* <Divider my={3} /> */}
                    {/* <Heading as="h2" size="md"my={3} color="gray">Viewの情報</Heading> */}
                    <Flex mb="3">
                      <Box bg="blue.700" color="white" px="4" py="0.5" mr="6" fontWeight="bold" >
                        国名
                      </Box>
                      {/* <Heading>国名</Heading> */}
                      <Text>
                        {
                          place.countries.map((country) => {
                            if(place.countries.length > 1) {
                              return country.name + " "
                            }else{
                              return country.name
                            }
                          })
                        }
                      </Text>
                    </Flex>
                    <Flex mb="3">
                      <Box bg="blue.700" color="white" px="4" py="0.5" mr="6" fontWeight="bold">
                        地域
                      </Box>
                      <Text>
                        {place.countries[0].state.name}
                      </Text>
                    </Flex>
                    <Flex mb="3">
                      <Box bg="blue.700" color="white" px="4" py="0.5" mr="6" fontWeight="bold">
                        カテゴリー
                      </Box>
                      <Text>
                        {
                          place.genres.map((genre) => {
                            if(place.genres.length > 1) {
                              return genre.name + " "
                            }else{
                              return genre.name
                            }
                          })
                        }
                      </Text>
                    </Flex>
                    <Flex mb="3">
                      <Box bg="blue.700" color="white" px="4" py="0.5" mr="6" fontWeight="bold">
                        ベストシーズン
                      </Box>
                      <Text>
                        {place.season}
                      </Text>
                    </Flex>
                    <Flex mb="3" align="center">
                      <Box bg="blue.700" color="white" px="4" py="0.5" mr="6" fontWeight="bold">
                        リスクレベル
                      </Box>
                      {/* <Text> */}
                        {/* {v.countries[0].riskLevel} */}
                        <PlaceDetailPagesRiskStar countries={place.countries} />
                      {/* </Text> */}
                    </Flex>
                    <Flex>
                      <Box bg="blue.700" color="white" px="4" py="0.5" mr="6" fontWeight="bold">
                        BMI指数
                      </Box>
                      <Text>
                        - 0.86
                      </Text>
                    </Flex>

                    <Box mt="6" textAlign="left" display={{base: "none", xl: "block"}}>
                      <Text fontSize="lg"  fontWeight="bold" color="blue.800" textShadow='0.5px 0.5px'>説明</Text>
                      <Divider pt="1" pb="1" />
                      <Text pt="2" fontSize="md">スワローズネスト（Swallow's Nest）は、ウクライナのクリミア半島にある有名な建物です。スワローズネストは、クリミア半島南岸のオレアンダ（Oreanda）という場所に位置し、クリミア海岸の崖の上に建っていますスワローズネストは、1912年に建設された小さな城状の建物で、特徴的な外観と美しい景観で知られています。建物は白い石とレンガで造られており、崖の上に立ち上がるように建てられています。その優雅な姿勢から、まるで燕の巣（Swallow's Nest）のように見えることから名付けられました。スワローズネストは、クリミア半島で最も有名な観光地の一つとなっており、訪れる人々を魅了しています。建物自体は小さな観光スポットですが、海岸線からの美しい景色やクリミアの壮大な自然環境を楽しむことができます。特に夕日が沈む時には、絶景として知られています。スワローズネストは、クリミア半島の他の観光地やリゾート地からもアクセスが良く、多くの観光客が訪れます。近くには美しいビーチやリゾート地があり、海水浴やリラックスした時間を過ごすこともできます。ウクライナのクリミア半島を訪れる際には、スワローズネストを訪れてその美しい景観を楽しむことをおすすめします。クリミアの自然と建築の美しさを堪能することができるでしょう。</Text>
                    </Box>
                    {/* <Text fontSize="lg"  fontWeight="bold">行楽期</Text>
                    <Text fontSize="md">シーギリヤのブスト（観光）シーズンは、主に12月から3月までの間になります。この期間はスリランカの乾季に当たり、比較的快適な気候となります。ブストシーズンでは、多くの観光客がシーギリヤを訪れるため、人気の観光地となります。特にクリスマスや年末年始の時期は混雑が予想されますので、早めの予約がおすすめです。この期間は日中の気温が比較的涼しく、快適な観光ができる一方、夜間は冷え込むこともありますので、暖かい服装の持参が必要です。ブストシーズン以外の時期でも、シーギリヤは訪れる価値のある場所ですが、雨季（主に5月から9月）は降雨量が多く、天候が不安定となることがありますので、注意が必要です。シーギリヤを訪れる際は、気候や混雑状況を考慮し、旅程の計画を立てることをおすすめします。</Text> */}
                </Box>

            </Flex>
            <Box mt="6" textAlign="left" display={{base: "block", xl: "none"}}>
              <Text fontSize="lg"  fontWeight="bold" color="blue.800" textShadow='0.5px 0.5px'>説明</Text>
              <Divider pt="1" pb="1" />
              <Text pt="2" fontSize="md">スワローズネスト（Swallow's Nest）は、ウクライナのクリミア半島にある有名な建物です。スワローズネストは、クリミア半島南岸のオレアンダ（Oreanda）という場所に位置し、クリミア海岸の崖の上に建っていますスワローズネストは、1912年に建設された小さな城状の建物で、特徴的な外観と美しい景観で知られています。建物は白い石とレンガで造られており、崖の上に立ち上がるように建てられています。その優雅な姿勢から、まるで燕の巣（Swallow's Nest）のように見えることから名付けられました。スワローズネストは、クリミア半島で最も有名な観光地の一つとなっており、訪れる人々を魅了しています。建物自体は小さな観光スポットですが、海岸線からの美しい景色やクリミアの壮大な自然環境を楽しむことができます。特に夕日が沈む時には、絶景として知られています。スワローズネストは、クリミア半島の他の観光地やリゾート地からもアクセスが良く、多くの観光客が訪れます。近くには美しいビーチやリゾート地があり、海水浴やリラックスした時間を過ごすこともできます。ウクライナのクリミア半島を訪れる際には、スワローズネストを訪れてその美しい景観を楽しむことをおすすめします。クリミアの自然と建築の美しさを堪能することができるでしょう。</Text>
            </Box>
          </Box>
        </>
      }
    </>
  )
})
