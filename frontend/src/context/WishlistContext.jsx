import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWishlist = async () => {
        try {
            setLoading(true);

            const response = await api.get("/wishlist");

            setWishlist(response.data.results);
        } catch (error) {
            console.error(
                "Failed to load wishlist:",
                error
            );

            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWishlist();
    }, []);

    const addToWishlist = async (movie) => {
        try {
            const response = await api.post(
                "/wishlist",
                {
                    movieId: movie.id,
                    title: movie.title,
                    year: movie.year,
                    posterUrl: movie.posterUrl,
                    type: movie.type
                }
            );

            setWishlist((currentWishlist) => [
                response.data.movie,
                ...currentWishlist
            ]);

            return {
                success: true
            };
        } catch (error) {
            console.error(
                "Failed to add movie to wishlist:",
                error
            );

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to add movie to wishlist"
            };
        }
    };

    const removeFromWishlist = async (movieId) => {
        try {
            await api.delete(
                `/wishlist/${movieId}`
            );

            setWishlist((currentWishlist) =>
                currentWishlist.filter(
                    (movie) =>
                        movie.movieId !== movieId
                )
            );

            return {
                success: true
            };
        } catch (error) {
            console.error(
                "Failed to remove movie from wishlist:",
                error
            );

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to remove movie from wishlist"
            };
        }
    };

    const isInWishlist = (movieId) => {
        return wishlist.some(
            (movie) =>
                movie.movieId === movieId
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                loading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}