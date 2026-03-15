const MovieList = (props) => {
    console.log(props)

        const mappedMovies = props.movies.map((movie) => (
            <li key={movie._id}>
                <h2>{movie.Title}</h2>
                <p>Genre: {movie.Genre}</p>
                <p>Year: {movie.Year}</p>
                <p>Rating: {movie.Rating}</p>
                <p>Tomato Meter: {movie.TomatoMeter}</p>
                <p>Runtime: {movie.Runtime} minutes</p>
                <p>Director: {movie.Director}</p>
            </li>   
        ))
    return (
        <div>
            <h1>Title List</h1>
            <div>
                {!props.movies.length ? (
                    <h2>No movies found.</h2>
                ) : (
                    <ul>{mappedMovies}</ul>
                )}
            </div>
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'Add Movie'}
            </button>
        </div>
    )   
}

export default MovieList
                   