import { NavLink, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Movie Discovery
                </Link>

                <div className="navbar-links">
                    <NavLink
                        to="/"
                        end
                    >
                        Home
                    </NavLink>

                    <NavLink to="/search?query=batman&page=1">
                        Discover
                    </NavLink>

                    <NavLink to="/wishlist">
                        Wishlist
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;