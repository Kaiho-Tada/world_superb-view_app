import { Center, Flex, Spinner, Wrap, WrapItem, useDisclosure, Box, Button, Image } from "@chakra-ui/react";
import { FC, memo, useState, useEffect, useCallback, createContext, Dispatch, SetStateAction } from "react";
import { PlaceCard } from "components/organisms/place/PlaceCard";
import { Place } from "types/api/place";
import { FilterDrawer } from "components/molecules/FilterDrawer";
import filter_icon from "img/511_s_f.png"
import { Genres } from "types/states/genres";
import { Countries } from "types/states/countries";
import { Types } from "types/states/types";
import { useNavigate } from "react-router-dom";
import { useAllPlaces } from "hooks/api/useAllPlaces";
import { useAllGenres } from "hooks/api/useAllGenres";
import { useAllCountries } from "hooks/api/useAllCountries";
import { useAllTypes } from "hooks/api/useAllTypes";
import { seasons } from "types/states/seasons";
import { riskLevels } from "types/states/riskLevels";
import { useOnClickClear } from "hooks/useOnClickClear";

export const PlaceContext = createContext({} as {
  onCloseFilterDrawer: () => void;
  isOpenFilterDrawer: () => void;
  onClickClear: () => void;
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  genres: Array<Genres>;
  setGenres: Dispatch<SetStateAction<Genres[]>>;
  countries: Array<Countries>;
  setCountries: Dispatch<SetStateAction<Countries[]>>;
  types: Array<Types>;
  setTypes: Dispatch<SetStateAction<Types[]>>;
  genreCategories: string[];
  countryStates: string[];
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  riskLevels: Array<riskLevels>;
  setRiskLevels: Dispatch<SetStateAction<riskLevels[]>>;
  seasons: Array<seasons>;
  setSeasons: Dispatch<SetStateAction<seasons[]>>;
});

export const AllPlaces: FC = memo(() => {

  const { getPlaces, places, setPlaces, loadingPlaces } = useAllPlaces();
  const { getGenres, genres, setGenres } = useAllGenres();
  const { getCountries, countries, setCountries } = useAllCountries();
  const { getTypes, types, setTypes } = useAllTypes();

  const [ keyword, setKeyword ] = useState<string>("");
  const [ riskLevels, setRiskLevels ] = useState<Array<riskLevels>>([
    {label: "4", checked: false},
    {label: "3", checked: false},
    {label: "2", checked: false},
    {label: "1", checked: false},
    {label: "0", checked: false},
  ]);
  const [ seasons, setSeasons ] = useState<Array<seasons>>([
    {label: "春", checked: false},
    {label: "夏", checked: false},
    {label: "秋", checked: false},
    {label: "冬", checked: false},
  ]);

  const {
    isOpen: isOpenFilterDrawer,
    onOpen: onOpenFilterDrawer,
    onClose: onCloseFilterDrawer
  } = useDisclosure();

  const genreCategories = [ "自然", "人工" ];
  const countryStates = [ "アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ" ];

  useEffect(() => {getPlaces()}, []);
  useEffect(() => {getGenres()}, []);
  useEffect(() => {getCountries()}, []);
  useEffect(() => {getTypes()}, []);

  const navigate = useNavigate();

  const onClickPlaceDetail = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>, place: Place) => {
    e.preventDefault();
    navigate("/places/" + place.id);
  }, []);

  const { onClickClear } = useOnClickClear({genres, setGenres, countries, setCountries, types, setTypes, setKeyword, getPlaces, riskLevels, keyword });
  // const [loading, setLoading] = useState(false)

  // const getPlaces = async () => {
  //   setLoading(true)
  //   // axios.get("http://localhost:3001/api/v1/places").then((res: any) => {
  //   // setPlaces(res.data)
  //   // })

  //   // PlaceAll().then((res: any) => {
  //   //   setPlaces(res.data)
  //   // })

  //   const res = await PlaceAll()
  //   console.log(res.data)

  //   if (res.status === 200) {
  //     setPlaces(res.data)
  //   }else {
  //     showMessage({title: "view取得に失敗しました", status: "error"})
  //   }
  //   setLoading(false)
  // }
  // const { PlaceProvider } = usePlaceProvider();
  return (
    <>
      <PlaceContext.Provider value={{onCloseFilterDrawer, isOpenFilterDrawer, onClickClear, setPlaces, genres, setGenres,
        countries, setCountries, types, setTypes, genreCategories, countryStates, keyword, setKeyword, riskLevels, setRiskLevels,
        seasons, setSeasons}}>
          {/* <Flex py={{base: 6, md: 10, lg: 12}} px={{base: 3, md: 6, lg: 10}} display={{ base: "block", md: "flex"}} bg="black"> */}
          {/* <FilterAccordion /> */}
        <Box pt={{base: 6, md: 10, lg: 12}} pl={{base: 6, md: 12, lg: 20}}>
          <Flex>
            <Box pb="4" pr="5">
              <Button colorScheme='red' variant='outline' onClick={onOpenFilterDrawer}  bg="white" >
                <Image  boxSize="20px" src={filter_icon} color="red"
                        mr="2" />
                絞り込み
              </Button>
            </Box>
            {/* <Select placeholder='並び替え' w="200px" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSortByRiskLevel(e)}>
              <option value='1'>riskLevelが低い順</option>
              <option value='option2'>BMI指数が低い順</option>
            </Select> */}
          </Flex>

          <FilterDrawer />
          {
            (() => {
              if (loadingPlaces == true) {
                return (
                  <Center h="70vh">
                    <Spinner role="spinner" />
                  </Center>
                )
              }else {
                return (
                  <Box align="center">
                    {/* <SearchBox /> */}
                    <Wrap>
                      {places.map((place) => (
                        <WrapItem w={{md: "100%", lg: "49%"}} key={place.id} onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => onClickPlaceDetail(e, place)}>
                          <PlaceCard imageUrl={place.imageUrl} name={place.name} countries={place.countries}/>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                )
              }
            })()
          }
        </Box>
        {/* </Flex> */}
      </PlaceContext.Provider>
    </>
  )
})
