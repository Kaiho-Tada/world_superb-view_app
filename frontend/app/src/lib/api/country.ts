import client from "lib/api/client"

export const CountryAll = () => {
  return client.get("/countries")
}
