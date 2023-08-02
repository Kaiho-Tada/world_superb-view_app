import client from "lib/api/client"

export const TypeAll = () => {
  return client.get("/types")
}
