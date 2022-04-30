// Compiled Scss
import "./App.css";

// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./Components/Base/NavBar";
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";
import Manga from "./Components/Pages/Manga";

// Context
import { MangaProvider } from "./Components/Context/Mangas/MangaContext";
import Footer from "./Components/Base/Footer";

function App() {
    return (
        <MangaProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exact path="/bookmarks" element={<Home />} />
                    <Route exact path="/list" element={<Home />} />
                    <Route exact path="/about" element={<Home />} />
                    <Route path="/*" element={<NotFound />} />

                    <Route path="/:id" element={<Manga />} />
                </Routes>
                <Footer />
            </Router>
        </MangaProvider>
    );
}

export default App;
