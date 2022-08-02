// Contect API
import React, { useState } from "react";
import { useContext, useEffect } from "react";

const AppContext = React.createContext();
const api_key = process.env.REACT_APP_API_KEY;
// We need to create a provider
// This app provider will work as a Delivery Boy

// API_URL
export const API_URL = `http://www.omdbapi.com/?apikey=${api_key}`;
const AppProvider = ({ children }) => {
    const [IsLoading, setIsLoading] = useState(true);
    const [Movies, setMovies] = useState([]);
    const [IsError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("titanic");
    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false);
                setIsError({
                    show: false,
                    msg: "",
                });
                setMovies(data.Search);
            } else {
                setIsError({
                    show: true,
                    msg: data.Error,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // For Getting 1 respond for each keystroke
        // Response recieved after 1000 ms
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 1000);
        return () => clearTimeout(timerOut);
    }, [query]);
    return (
        <AppContext.Provider
            value={{ IsLoading, IsError, Movies, query, setQuery }}>
            {children}
        </AppContext.Provider>
    );
};
// Custom Hooks
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
