// Compiled Scss
import "./App.css";

// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./Components/Base/NavBar";
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";
import Manga from "./Components/Pages/Manga";
import Strip from "./Components/Pages/Strip";

// Context
import { MangaProvider } from "./Components/Context/Mangas/MangaContext";
import Footer from "./Components/Base/Footer";

import { motion, AnimatePresence } from "framer-motion";

function App() {
    return (
        <MangaProvider>
            <Router>
                <NavBar />
                <AnimatePresence>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route exact path="/bookmarks" element={<Home />} />
                        <Route exact path="/list" element={<Home />} />
                        <Route exact path="/about" element={<Home />} />
                        <Route path="/*" element={<NotFound />} />

                        <Route exact path="/mangas/:id" element={<Manga />} />
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
    );
}

export default App;
