import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//4bca902a
const API_URL = "http://www.omdbapi.com/?apikey=4bca902a";

const App = () => {
  const [movies, setMovies] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, []);


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };


  return (
    <>
      <div className="app">
      <a href="/">
          <img className="img1" src="./logo1.png" alt="logo" />
        </a>
        <div className="search">
          <input
            placeholder="Search Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <img
            src={SearchIcon}
            alt="searchIcon"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found !</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
