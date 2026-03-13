import React from "react";

const MoviesList = ({ movies }) => {
    return (
        <div>
            <h2>Movies List</h2>
            <ul>
                {movies.map(movie => (
                    <li
                        key={movie._id}
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => console.log(`Clicked on movie with id: ${movie._id}`)}
                    >   
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MoviesList;  