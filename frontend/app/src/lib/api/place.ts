import client from "lib/api/client"

export const PlaceAll = () => {
  return client.get("/places")
}

export const SearchPlace = (genre_names: string[], country_names: string[], type_names: string[]) => {
  return client.get("/places/search", {
    params: {
      genre_names: genre_names,
      country_names: country_names,
      type_names: type_names,
    }
  })
}
