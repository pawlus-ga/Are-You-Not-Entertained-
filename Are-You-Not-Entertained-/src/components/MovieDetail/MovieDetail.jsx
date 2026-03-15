const MovieDetail = (props) => {
    console.log(props)

    if(!props.selected) {
        return (
            <div>
                <h1>No movie selected</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>{props.selected.name}</h1>
            <h2>Director: {props.selected.director}</h2>
            <h2>Year: {props.selected.year}</h2>
            <h2>Genre: {props.selected.genre}</h2>
            <h2>Rating: {props.selected.rating}</h2>
            <h2>Tomato Meter: {props.selected.tomatoMeter}</h2>
        </div>
    )
}

export default MovieDetail