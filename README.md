# Movie Discovery App

A full-stack movie discovery app built with React, Node.js, Express, MongoDB, and OMDb API, featuring movie search, pagination, sorting, filtering, detailed movie information, and a persistent wishlist.

## Project Structure

movie-discovery-app/
│
├── frontend/
│ ├── public/
│ │
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── MovieCard.jsx
│ │ │ ├── MovieGrid.jsx
│ │ │ ├── SearchBar.jsx
│ │ │ ├── FilterBar.jsx
│ │ │ ├── SortDropdown.jsx
│ │ │ ├── Loading.jsx
│ │ │ ├── ErrorMessage.jsx
│ │ │ ├── EmptyState.jsx
│ │ │ └── MovieInfoItem.jsx
│ │ │
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── SearchResults.jsx
│ │ │ ├── MovieDetails.jsx
│ │ │ └── Wishlist.jsx
│ │ │
│ │ ├── context/
│ │ │ └── WishlistContext.jsx
│ │ │
│ │ ├── services/
│ │ │ └── api.js
│ │ │
│ │ ├── hooks/
│ │ │ └── useDebounce.js
│ │ │
│ │ ├── utils/
│ │ │ └── movieUtils.js
│ │ │
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ │
│ ├── package.json
│ └── vite.config.js
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js
│ │ │
│ │ ├── controllers/
│ │ │ ├── movieController.js
│ │ │ └── wishlistController.js
│ │ │
│ │ ├── models/
│ │ │ └── Wishlist.js
│ │ │
│ │ ├── routes/
│ │ │ ├── movieRoutes.js
│ │ │ └── wishlistRoutes.js
│ │ │
│ │ ├── services/
│ │ │ └── omdbService.js
│ │ │
│ │ └── utils/
│ │ └── normalizeMovie.js
│ │
│ ├── .env
│ ├── .env.example
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md

## ⚙️ Installation & Setup

Follow the steps below to run the Movie Discovery App locally.

### 1. Prerequisites

Make sure the following software is installed on your system:

- Node.js (v18 or later recommended)
- npm
- Git
- MongoDB Atlas account
- OMDb API key
- VS Code or any preferred code editor

You can verify Node.js and npm installation using:

````bash
node --version
npm --version


## 🚀 Usage

The Movie Discovery App provides a complete movie discovery experience where users can search for movies, explore search results, sort and filter them, navigate through multiple pages, view detailed movie information, and maintain a persistent wishlist.

---

## 📌 Application Flow

The overall application flow is:

```text
                    ┌─────────────────────┐
                    │     Home Page       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Search for Movie  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Search Results    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
             Sorting       Filtering     Pagination
                │              │              │
                └──────────────┼──────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Movie Details     │
                    └──────────┬──────────┘
                               │
                       ┌───────┴────────┐
                       │                │
                       ▼                ▼
                Add to Wishlist    Back to Results
                       │
                       ▼
                ┌───────────────┐
                │   Wishlist    │
                └───────┬───────┘
                        │
                        ▼
                 Remove Movie

## 📸 Screenshots

<p align="center">
  <img src="./screenshots/home_page.png" width="45%" />
  <img src="./screenshots/Discover_page.png" width="45%" />
</p>

<p align="center">
  <img src="./screenshots/wishlist_page.png" width="45%" />
</p>

## 📞 Contact

**Developer:** Devendra Kumar Gatla

- 📧 Email: devendrakumarg1001@gmail.com
- 💻 GitHub: [Your GitHub Profile](https://github.com/Dev1001-ux)
- 🔗 LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/devendra-kumar-gatla-314307363/)
````
