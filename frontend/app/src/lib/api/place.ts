import client from "lib/api/client"

export const PlaceAll = () => {
  return client.get("/places")
}
