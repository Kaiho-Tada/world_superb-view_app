import { useDisclosure } from "@chakra-ui/react";
import { FC, ReactNode, useContext, useState } from "react"
import { riskLevels } from "types/states/riskLevels";
import { seasons } from "types/states/seasons";
import { useAllPlaces } from "hooks/api/useAllPlaces";
import { useAllGenres } from "hooks/api/useAllGenres";
import { useAllCountries } from "hooks/api/useAllCountries";
import { useAllTypes } from "hooks/api/useAllTypes";
import { useOnClickClear } from "hooks/useOnClickClear";
import { PlaceContext } from "components/pages/AllPlaces";

// type Props ={
//   children: ReactNode;
//   onCloseFilterDrawer: () => void;
//   isOpenFilterDrawer: () => void;
//   onClickClear: () => void;
//   setPlaces: Dispatch<SetStateAction<Place[]>>;
//   genres: Array<Genres>;
//   setGenres: Dispatch<SetStateAction<Genres[]>>;
//   countries: Array<Countries>;
//   setCountries: Dispatch<SetStateAction<Countries[]>>;
//   types: Array<Types>;
//   setTypes: Dispatch<SetStateAction<Types[]>>;
//   genreCategories: string[];
//   countryStates: string[];
//   keyword: string;
//   setKeyword: Dispatch<SetStateAction<string>>;
//   riskLevels: Array<riskLevels>;
//   setRiskLevels: Dispatch<SetStateAction<riskLevels[]>>;
//   seasons: Array<seasons>;
//   setSeasons: Dispatch<SetStateAction<seasons[]>>;
// };

// export const usePlaceProvider = () => {
//   return {PlaceProvider};
// }
type Props = {
  children: ReactNode;
}

export const usePlaceContext = () => useContext(PlaceContext);

const PlaceProvider: FC<Props> = ({children}) => {
  const { getPlaces, places, setPlaces } = useAllPlaces();
  const [genres, setGenres] = useState([
    { label: "砂漠", category: "自然", place_names: ["サハラ砂漠"], checked: false}
  ]);
  const [countries, setCountries] = useState([
    { label: "中国", state: "アジア", place_names:[ "万里の長城"], checked: false}
  ]);
  const [types, setTypes] = useState([
    { label: "荘厳", place_names: ["ルクソール"], checked: false}
  ]);

  const [ keyword, setKeyword ] = useState<string>("");
  const [riskLevels, setRiskLevels] = useState<Array<riskLevels>>([
    {label: "4", checked: false},
    {label: "3", checked: false},
    {label: "2", checked: false},
    {label: "1", checked: false},
    {label: "0", checked: false},
  ]);
  const [seasons, setSeasons] = useState<Array<seasons>>([
    {label: "春", checked: false},
    {label: "夏", checked: false},
    {label: "秋", checked: false},
    {label: "冬", checked: false},
  ]);
  const { onClickClear } = useOnClickClear({genres, setGenres, countries, setCountries, types, setTypes, setKeyword, getPlaces, riskLevels, keyword });

  const {
    isOpen: isOpenFilterDrawer,
    onOpen: onOpenFilterDrawer,
    onClose: onCloseFilterDrawer
  } = useDisclosure();

  const genreCategories = [ "自然", "人工" ];
  const countryStates = [ "アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ" ];
  const value = {
    countries,
    setCountries,
    genres,
    setGenres,
    types,
    setTypes,
    places,
    setPlaces,
    keyword,
    setKeyword,
    riskLevels,
    setRiskLevels,
    seasons,
    setSeasons,
    isOpenFilterDrawer,
    onCloseFilterDrawer,
    genreCategories,
    countryStates,
    onClickClear
  }
  return (
    <PlaceContext.Provider value={value}>
      {children}
    </PlaceContext.Provider>
  );
};
export { PlaceProvider };
