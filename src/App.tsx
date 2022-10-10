// Compiled Scss
import "./App.css"
import "react-toastify/dist/ReactToastify.css"

// Imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { ToastContainer } from "react-toastify"

// Components
import NavBar from "./Components/Layout/Navbar/NavBar"
import Footer from "./Components/Layout/Footer/Footer"
import GoUpButton from "./Components/Layout/GoUpButton"
//
import Home from "./Components/Pages/Home"
import Strip from "./Components/Pages/Strip"
import Manga from "./Components/Pages/Manga"
import MangaList from "./Components/Pages/MangaList"
import SearchManga from "./Components/Pages/SearchManga"
import Profile from "./Components/Pages/Profile"
import Bookmarks from "./Components/Pages/Bookmarks"
import Composer from "./Components/Pages/Composer"
import OldComposer from "./Components/Pages/Composer/OldComposer"
import About from "./Components/Pages/About"
//
import SignIn from "./Components/Pages/SignIn"
import SignUp from "./Components/Pages/SignUp"
import ForgotPassword from "./Components/Pages/forgotPassword"
import SignOut from "./Components/Pages/SignOut"
import PrivateRoute from "./Components/Pages/PrivateRoute"
import AdminOnly from "./Components/Pages/AdminOnly"
import NotFound from "./Components/Pages/NotFound"

// Context
import { MangaProvider } from "./Components/Context/Mangas/MangaContext"
import { BannerProvider } from "./Components/Context/Banners/BannerContext"
import { SearchProvider } from "./Components/Context/Search/SearchContext"
import { MantineProvider } from "@mantine/core"

import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles"
import React from "react"
import UpdatesNotification from "./Components/Layout/UpdatesNotification"
import LoadingLayout from "./Components/Layout/LoadingLayout"
import { LoadingProvider } from "./Components/Context/LoadingContext"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

function App() {
  return (
    <MantineProvider>
      <BannerProvider>
        <MangaProvider>
          <SearchProvider>
            <ThemeProvider theme={darkTheme}>
              <Router>
                <LoadingProvider>
                  <div className="relative min-h-screen">
                    <NavBar />
                    <AnimatePresence>
                      <Routes>
                        <Route
                          path="/"
                          element={<Home />}
                        />
                        <Route
                          path="/bookmarks"
                          element={<Bookmarks />}
                        />
                        <Route
                          path="/options"
                          element={<PrivateRoute />}
                        >
                          <Route
                            path="/options"
                            element={<Profile />}
                          />
                        </Route>
                        <Route
                          path="/signIn"
                          element={<SignIn />}
                        />
                        <Route
                          path="/signUp"
                          element={<SignUp />}
                        />
                        <Route
                          path="/forgotPassword"
                          element={<ForgotPassword />}
                        />
                        <Route
                          path="/logOut"
                          element={<SignOut />}
                        />
                        <Route
                          path="/search"
                          element={<SearchManga />}
                        />
                        <Route
                          path="/search/:query"
                          element={<SearchManga />}
                        />
                        <Route
                          path="/list"
                          element={<MangaList />}
                        />
                        <Route
                          path="/about"
                          element={<About />}
                        />
                        <Route
                          path="/*"
                          element={<NotFound />}
                        />

                        <Route
                          path="/mangas/:id"
                          element={<Manga />}
                        />
                        <Route
                          path="/mangas/:id/chapter/:chapId"
                          element={<Strip />}
                        />
                        <Route
                          path="/compose"
                          element={<AdminOnly />}
                        >
                          <Route
                            path="/compose"
                            element={<Composer />}
                          />
                        </Route>

                        <Route
                          path="/old-composer"
                          element={<AdminOnly />}
                        >
                          <Route
                            path="/old-composer"
                            element={<OldComposer />}
                          />
                        </Route>
                      </Routes>
                    </AnimatePresence>
                    <div className="inline-block mx-20 mb-56 font-light text-2xl" />
                    <Footer />
                  </div>
                  <GoUpButton windowRef={window} />
                  <LoadingLayout />
                  {/* (<UpdatesNotification />) */}
                </LoadingProvider>
              </Router>
            </ThemeProvider>
            <ToastContainer />
          </SearchProvider>
        </MangaProvider>
      </BannerProvider>
    </MantineProvider>
  )
}

export default App
