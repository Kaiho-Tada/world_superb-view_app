import axios from "axios"
import client from "lib/api/client"

export const TypeAll = () => {
  return client.get("/types")
}

// export const TypeAll = () => {
//   return (
//       axios.get("http://localhost:3001/api/v1/types")
//     )
// }
