import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { API_URL } from "./context";

const SingleMovie = () => {
    const { id } = useParams();

    const [IsLoading, setIsLoading] = useState(true);
    const [Movies, setMovies] = useState();
    // const [IsError, setIsError] = useState({ show: "false", msg: "" });
    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false);
                setMovies(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // For Getting 1 respond for each keystroke
        // Response recieved after 1000 ms
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&i=${id}`);
        }, 1000);
        return () => clearTimeout(timerOut);
    }, [id]);

    if (IsLoading) {
        return (
            <div className="movie-section">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <div className="movie-section">
                <div className="movie-card">
                    <figure>
                        <img src={Movies.Poster} alt="" />
                    </figure>
                    <div className="card-content">
                        <p className="title">{Movies.Title}</p>
                        <p className=""></p>
                        <p className="card-text">
                            <b>Release Date : </b>
                            {Movies.Released}
                        </p>
                        <p className="card-text">
                            <b>Genre : </b> {Movies.Genre}
                        </p>
                        <p className="card-text">
                            <b>Rating : </b> {Movies.imdbRating} / 10
                        </p>
                        <p className="card-text">
                            <b>Country : </b> {Movies.Country}
                        </p>
                        <p className="card-text">
                            <b>Content-Type : </b> {Movies.Rated}
                        </p>
                        <p className="card-text">
                            <b>Plot : </b> <br /> {Movies.Plot}
                        </p>
                        <NavLink to="/" className="back-btn">
                            Go Back
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleMovie;
