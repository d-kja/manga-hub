// Compiled Scss
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

// Components
import NavBar from "./Components/Layout/Navbar/NavBar";
import Footer from "./Components/Layout/Footer/Footer";
import GoUpButton from "./Components/Layout/GoUpButton";
//
import Home from "./Components/Pages/Home";
import Strip from "./Components/Pages/Strip";
import Manga from "./Components/Pages/Manga";
import MangaList from "./Components/Pages/MangaList";
import SearchManga from "./Components/Pages/SearchManga";
import Profile from "./Components/Pages/Profile";
import Bookmarks from "./Components/Pages/Bookmarks";
import About from "./Components/Pages/About";
//
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import SignOut from "./Components/Pages/SignOut";
import PrivateRoute from "./Components/Pages/PrivateRoute";
import NotFound from "./Components/Pages/NotFound";

// Context
import { MangaProvider } from "./Components/Context/Mangas/MangaContext";
import { BannerProvider } from "./Components/Context/Banners/BannerContext";
import { SearchProvider } from "./Components/Context/Search/SearchContext";

function App() {
    return (
        <BannerProvider>
            <MangaProvider>
                <SearchProvider>
                    <Router>
                        <div
                            className="relative min-h-screen"
                            onScroll={(e) => console.log(e)}
                        >
                            <NavBar />
                            <AnimatePresence>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        exact
                                        path="/bookmarks"
                                        element={<PrivateRoute />}
                                    >
                                        <Route
                                            exact
                                            path="/bookmarks"
                                            element={<Bookmarks />}
                                        />
                                    </Route>
                                    <Route
                                        exact
                                        path="/options"
                                        element={<PrivateRoute />}
                                    >
                                        <Route
                                            exact
                                            path="/options"
                                            element={<Profile />}
                                        />
                                    </Route>
                                    <Route
                                        exact
                                        path="/signIn"
                                        element={<SignIn />}
                                    />
                                    <Route
                                        exact
                                        path="/signUp"
                                        element={<SignUp />}
                                    />
                                    <Route
                                        exact
                                        path="/logOut"
                                        element={<SignOut />}
                                    />
                                    <Route
                                        exact
                                        path="/search"
                                        element={<SearchManga />}
                                    />
                                    <Route
                                        exact
                                        path="/search/:query"
                                        element={<SearchManga />}
                                    />
                                    <Route
                                        exact
                                        path="/list"
                                        element={<MangaList />}
                                    />
                                    <Route
                                        exact
                                        path="/about"
                                        element={<About />}
                                    />
                                    <Route path="/*" element={<NotFound />} />

                                    <Route
                                        exact
                                        path="/mangas/:id"
                                        element={<Manga />}
                                    />
                                    <Route
                                        exact
                                        path="/mangas/:id/chapter/:chapId"
                                        element={<Strip />}
                                    />
                                </Routes>
                            </AnimatePresence>
                            <div className="inline-block mx-20 mb-56 font-light text-2xl" />
                            <Footer />
                        </div>
                        <GoUpButton windowRef={window} />
                    </Router>
                    <ToastContainer />
                </SearchProvider>
            </MangaProvider>
        </BannerProvider>
    );
}

export default App;
