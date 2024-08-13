import { Movie } from '../../types';
import Hero from '../Hero/hero';

const Home = ({movies}: {movies: Movie[]}) => {
  return (
    <Hero movies={movies}/>
  )
}

export default Home;