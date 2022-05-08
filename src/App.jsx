// Compiled Scss
import "./App.css";

// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import NavBar from "./Components/Layout/Navbar/NavBar";
import Footer from "./Components/Layout/Footer/Footer";
//
import Home from "./Components/Pages/Home";
import Manga from "./Components/Pages/Manga";
import Strip from "./Components/Pages/Strip";
import MangaList from "./Components/Pages/MangaList";
import SearchManga from "./Components/Pages/SearchManga";
import Bookmarks from "./Components/Pages/Bookmarks";
import About from "./Components/Pages/About";
import NotFound from "./Components/Pages/NotFound";

// Context
import { MangaProvider } from "./Components/Context/Mangas/MangaContext";
import { BannerProvider } from "./Components/Context/Banners/BannerContext";

function App() {
    return (
        <BannerProvider>
            <MangaProvider>
                <Router>
                    <NavBar />
                    <AnimatePresence>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                exact
                                path="/bookmarks"
                                element={<Bookmarks />}
                            />
                            <Route
                                exact
                                path="/search"
                                element={<SearchManga />}
                            />
                            <Route exact path="/list" element={<MangaList />} />
                            <Route exact path="/about" element={<About />} />
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
                    <div className="divider mx-20 my-14 font-light text-2xl" />
                    <Footer />
                </Router>
            </MangaProvider>
        </BannerProvider>
    );
}

export default App;
