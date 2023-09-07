import axios from "axios"
import client from "lib/api/client"

export const CountryAll = () => {
  return client.get("/countries")
}

// export const CountryAll = () => {
//   return (
//       axios.get("http://localhost:3001/api/v1/countries")
//     )
// }
