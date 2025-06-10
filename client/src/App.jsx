import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./styles/index.css";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";
import ShortCode from "./pages/ShortCode";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sample from "./pages/Sample";
import SampleTextFile from "./pages/SampleTextFile";

function Router() {
  const location = useLocation();
  const hideLayoutRoutes = ["/edit"];
  const shouldHideLayout = location.pathname.includes(hideLayoutRoutes);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/blogs"} element={<Blogs />} />
        <Route path={"/blog/:slug"} element={<BlogPage />} />
        <Route path={"/sample"} element={<Sample />} />
        <Route path={"/edit/:blog"} element={<SampleTextFile />} />
        <Route path={"/code"} element={<ShortCode />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
