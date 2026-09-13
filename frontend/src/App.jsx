import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";

import Navbar from "./components/Navbar";

import {
    WishlistProvider
} from "./context/WishlistContext";

function App() {
    return (
        <WishlistProvider>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/search"
                        element={<SearchResults />}
                    />

                    <Route
                        path="/movie/:id"
                        element={<MovieDetails />}
                    />

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />


                </Routes>
            </BrowserRouter>
        </WishlistProvider>
    );
}

export default App;