import { FC, memo } from "react";
import { Routes, Route } from "react-router-dom"

import { Home } from "components/pages/Home";
import { Login } from "components/pages/Login";
import { Signup } from "components/pages/Signup";
import { Page404 } from "components/pages/Page404";

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
})
