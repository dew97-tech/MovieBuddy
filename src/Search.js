import React from "react";
import { useGlobalContext } from "./context";

const Search = () => {
    const { query, setQuery, IsError } = useGlobalContext();
    return (
        <>
            <section className="search-section">
                <h2>Search For Movies & TV Shows</h2>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search Movie"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </form>
                <div className="card-error">
                    <p>{IsError.show && IsError.msg}</p>
                </div>
            </section>
        </>
    );
};

export default Search;
