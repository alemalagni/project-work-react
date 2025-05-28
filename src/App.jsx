import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DefaultLayout from "./layouts/DefaulLayout"
import MangaDetailsPage from "./pages/MangaDetailsPage"
import MangaPage from "./pages/MangaPage"
import NotFound from "./pages/NotFound"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/manga" element={<MangaPage />} />
            <Route path="/manga/:slug" element={<MangaDetailsPage />} />
            <Route path="/contacts" element={<div>contatti</div>} />
            <Route path="/about" element={<div>chi siamo</div>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
