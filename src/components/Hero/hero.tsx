import './hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Movie } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Hero = ({ movies }: { movies: Movie[] }) => {
    const navigate = useNavigate();

    // Function to handle the review navigation
    const handleReviews = (movieId: string) => {
        navigate(`/Reviews/${movieId}`);
    };

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies.map((movie) => (
                        <Paper key={movie.imdbId}>
                            <div className='movie-card-container'>
                                <div className='movie-card' style={{ ["--img" as any]: `url(${movie.backdrops[0]})` }}>
                                    <div className='movie-detail'>
                                        <div className="movie-poster">
                                            <img src={movie.poster} alt='' />
                                        </div>
                                        <div className="movie-title">
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className="movie-buttons-container">
                                            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                                                </div>
                                            </Link>
                                            <div className='movie-reviews-button-container'>
                                                <Button
                                                    variant="info"
                                                    onClick={() => handleReviews(movie.imdbId)} // Correctly handle the button click
                                                >
                                                    Reviews
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    ))
                }
            </Carousel>
        </div>
    );
};

export default Hero;
