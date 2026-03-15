import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import SignInForm from './components/SignInForm/SignInForm.jsx';
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import MoviesList from './components/MoviesList/MoviesList.jsx';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import MovieForm from './components/MovieForm/MovieForm.jsx';
import EditMovie from './components/EditMovie/EditMovie.jsx';
import { getAllMovies } from './services/movies.js';
import { UserContext } from './context/UserContext.jsx';

function App() {
  const [movies, setMovies] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen)
  }

  const fetchMovies = async () => {
    const moviesData = await getAllMovies()
    setMovies(moviesData)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="App">
      <UserContext>
        <NavBar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUpForm />} />

          <Route path='/sign-in' element={<SignInForm />} />

          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/movies' element={<MoviesList movies={movies}
             handleFormView={handleFormView} isFormOpen={isFormOpen} />} />

          <Route path='/movies/:id' element={<MovieDetail />} />

          <Route path='/movies/new' element={<MovieForm />} />

          <Route path='/movies/:id/edit' element={<EditMovie />} />

        </Routes>
      </UserContext>
    </div>
  )
}

export default App  