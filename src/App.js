import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
/**
 * TODO: Lazy load these. Look into React.lazy and Suspense
 */
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
