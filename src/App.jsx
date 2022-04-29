// Compiled Scss
import "./App.css";

// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./Components/Base/NavBar";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";

// Context
import { MangaProvider } from "./Components/Context/Images/Manga/HomeList/MangaContext";

function App() {
    return (
        <MangaProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bookmarks" element={<Home />} />
                    <Route path="/list" element={<Home />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        </MangaProvider>
    );
}

export default App;
