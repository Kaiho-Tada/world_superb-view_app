import axios from "axios"
import applyCaseMiddleware from "axios-case-converter"
import client from "./client"
// import client from "lib/api/client"

export const PlaceAll = () => {
  return client.get("/places")
}

// export const PlaceAll = () => {
//   return (
//     applyCaseMiddleware(
//       axios.get("http://localhost:3001/api/v1/places"),
//       options
//     )
//   )
// }
// export const PlaceAll = () => {
//   return fetch("http://localhost:3001/api/v1/places")
// }
// const GET_ALL_VIEW_URL = "http://localhost:3001/api/v1/places";
// export const PlaceAll = () => {
//   return axios.get(GET_ALL_VIEW_URL)
// }

// export const SearchPlace = (genre_names: string[], country_names: string[], type_names: string[],
//   keyword: string, riskLevels: string[], seasonsNames: string[]) => {
//   return client.get("/places/search", {
//     params: {
//       genre_names: genre_names,
//       country_names: country_names,
//       type_names: type_names,
//       keyword: keyword,
//       riskLevels: riskLevels,
//       seasonsNames: seasonsNames,
//     }
//   })
// }
// {genre_names = [], country_names = [], type_names = [], riskLevels = [], seasonsNames = [], keyword = ""}

type Props = {
  genreCheckBoxLabels: string[],
  countryCheckBoxLabels: string[],
  typeCheckBoxLabels: string[],
  riskCheckBoxLabels: string[],
  keyword: string,
}

export const SearchPlace = (props: Props) => {
  const { genreCheckBoxLabels, countryCheckBoxLabels, typeCheckBoxLabels, riskCheckBoxLabels, keyword } = props;
  return client.get("/places/search", {
    params: {
      genre_names: genreCheckBoxLabels,
      country_names: countryCheckBoxLabels,
      type_names: typeCheckBoxLabels,
      riskLevels: riskCheckBoxLabels,
      keyword: keyword,
    }
  })
}
