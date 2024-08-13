import "./App.css";
import api from "./api/axios-config";
import { useState, useEffect } from "react";
import Layout from "./components/layout";
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import { Movie, Review } from "./types";
import Header from "./components/Header/header";
import Trailer from "./components/Trailer/trailer";
import Reviews from "./components/Reviews/reviews";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieData = async (movieId:string) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews movie={movie || {} as Movie} getMovieData={getMovieData} reviews={reviews} setReviews={setReviews} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
