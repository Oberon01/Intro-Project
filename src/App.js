import { useEffect, useState } from "react";
import './App.css';
import searchIcon from './search.svg'
import MovieCard from "./movieCard";

const API_URL = 'http://www.omdbapi.com?apikey=bd74c123';
const movie1 = {
  "Title": "Batman & Robin",
  "Year": "1997",
  "imdbID": "tt0118688",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
}
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(`https://imdb.com/title/${data.Search[0].imdbID}`)
  };

  useEffect(() => {
    searchMovies('Batman');
    

  },[]);
  return (
    <div className="app">
      <h1>CinemaFinema</h1>
      <div className="search">
        <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
      </div>
      {movies?.length > 0 
        ? ( <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
        </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>)
      };
    </div>
  );
}

export default App;
