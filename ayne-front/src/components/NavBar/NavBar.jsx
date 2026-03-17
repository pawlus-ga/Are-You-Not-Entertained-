import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const NavBar = () => {
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    };

    return (
        <div className="navbar">
            <nav>
                <div id="navlinks1">
                    {user ? (
                        <ul>
                            <li>Welcome, {user.username} </li>
                            <li><Link to='/'>Dashboard</Link></li>
                            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
                            <li><Link to="/movies/search">Search Movies</Link></li>
                            <li><Link to="/lists/new">Create List</Link></li>
                            <li><Link to="/lists">View Lists</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/sign-in'>Sign In</Link></li>
                            <li><Link to='/sign-up'>Sign Up</Link></li>
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    )}

export default NavBar
