import { FC, memo } from "react";
import { Routes, Route } from "react-router-dom"

import { Home } from "components/pages/Home";
import { Login } from "components/pages/Login";
import { Signup } from "components/pages/Signup";
import { Page404 } from "components/pages/Page404";
import { CommonLayout } from "templates/CommonLayout";

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout><Home /></CommonLayout>} />
      <Route path="/login" element={<CommonLayout><Login /></CommonLayout>} />
      <Route path="/signup" element={<CommonLayout><Signup /></CommonLayout>} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
})
