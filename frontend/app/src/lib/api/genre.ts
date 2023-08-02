import client from "lib/api/client"

export const GenreAll = () => {
  return client.get("/genres")
}
