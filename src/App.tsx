import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OTPPage from "./pages/OTP";
import VerifyIdentity from "./pages/VerifyIdentity";
import React from "react";
  
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/verify-identity" element={<VerifyIdentity />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export function renderToDOM(container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
