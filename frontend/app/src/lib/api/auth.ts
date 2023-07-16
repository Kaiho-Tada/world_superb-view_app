import client from "lib/api/client"
import Cookies from "js-cookie"

import { LoginData, SignupData } from "types/api/auth"


export const signup = (data: SignupData) => {
  return client.post("auth", data)
}

export const login = (data: LoginData)  => {
  return client.post("auth/sign_in", data)
}

export const signout = () => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
