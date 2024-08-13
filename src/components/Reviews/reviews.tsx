import {FormEvent, useEffect, useRef} from 'react';
import api from '../../api/axios-config';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../ReviewForm/reviewForm';

import React from 'react'
import { Movie, Review } from '../../types';

const Reviews = ({getMovieData,movie,reviews,setReviews}: { reviews: Review[], movie: Movie, getMovieData: any, setReviews: any }) => {

    const revText = useRef<HTMLTextAreaElement>(null);
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        
        if (!revText.current) {
            console.log("Review is not defined");
            return;
        }
        
        const rev:any = revText.current;
        
        try
        {
            const response = await api.post("/api/v1/reviews",{ reviewBody: rev.value, imdbId: movieId });

            const updatedReviews = [...(reviews), {body:rev.value}];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                        reviews?.map((r: Review, index: number) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews
