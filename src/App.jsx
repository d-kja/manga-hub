// Compiled Scss
import "./App.css";

// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./Components/Base/NavBar";
import Footer from "./Components/Base/Footer";
//
import Home from "./Components/Pages/Home";
import Strip from "./Components/Pages/Strip";
import Manga from "./Components/Pages/Manga";
import Bookmarks from "./Components/Pages/Bookmarks";
import MangaList from "./Components/Pages/MangaList";
import About from "./Components/Pages/About";
//
import NotFound from "./Components/Pages/NotFound";

// Context
import { MangaProvider } from "./Components/Context/Mangas/MangaContext";
import { BannerProvider } from "./Components/Context/Banners/BannerContext";

import { AnimatePresence } from "framer-motion";

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
                    <Footer />
                </Router>
            </MangaProvider>
        </BannerProvider>
    );
}

export default App;
