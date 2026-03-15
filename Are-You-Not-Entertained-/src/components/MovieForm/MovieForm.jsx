const MovieForm = (props) => {
    const [formData, setFormData] = useState({
        Title: '',
        Genre: '',
        Year: '',
        Rating: '',
        TomatoMeter: '',
        Runtime: '',
        Director: '',
    })
    // console.log(props)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            props.handleCreate(formData);
        }}>
            <input type="text" name="Title" value={formData.Title}
                onChange={handleChange} placeholder="Title" />

            <input type="text" name="Genre" value={formData.Genre}
                onChange={handleChange} placeholder="Genre" />

            <input type="text" name="Year" value={formData.Year}
                onChange={handleChange} placeholder="Year" />

            <input type="text" name="Rating" value={formData.Rating}
                onChange={handleChange} placeholder="Rating" />

            <input type="text" name="TomatoMeter" value={formData.TomatoMeter}
                onChange={handleChange} placeholder="Tomato Meter" />

            <input type="text" name="Runtime" value={formData.Runtime}
                onChange={handleChange} placeholder="Runtime (minutes)" />

            <input type="text" name="Director" value={formData.Director}
                onChange={handleChange} placeholder="Director" />

            <button type="submit">{props.selected ? 'Update Movie' : 'Create Movie'}</button>
        </form>
    )
}

export default MovieForm