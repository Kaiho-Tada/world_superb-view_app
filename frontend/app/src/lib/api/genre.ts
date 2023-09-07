import axios from "axios"
import client from "lib/api/client"

export const GenreAll = () => {
  return client.get("/genres")
}

// export const GenreAll = () => {
//   return (
//       axios.get("http://localhost:3001/api/v1/genres")
//     )
// }
