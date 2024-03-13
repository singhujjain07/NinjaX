import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'


const Header = ({ scrollToForcesSection, scrollToLeetcodeSection }) => {
    const [auth, setAuth] = useAuth()
    const location = useLocation();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    {/* <Link className="navbar-brand d-lg-none d-xs-block py-3" to="#">
                        <img src="/static_files/images/logos/beer_white.png" height={40} alt="Company Logo" />
                    </Link> */}
                    <Link className='navbar-brand' to="/">
                        <div className='d-flex align-items-center flex-row'>
                            <img className='me-2' src="images/brand.png" height={45} alt="MDB Logo" loading="lazy" />
                            <h3 className='pt-2'>NinjaX</h3>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        {/* <Link className='navbar-brand' to="/">
                            <div className='d-flex align-items-center flex-row'>
                                <img className='me-2' src="images/brand.png" height={45} alt="MDB Logo" loading="lazy" />
                                <h3 className='pt-2'>NinjaX</h3>
                            </div>
                        </Link> */}
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={`nav-link mx-2 ${location.pathname === '/' ? 'active' : ''} btn rounded-0 btn-danger`} aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {
                                location.pathname === '/' ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link mx-2 btn rounded-0 btn-danger" to="#forces_section" onClick={scrollToForcesSection}>
                                                Codeforces
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link mx-2 btn rounded-0 btn-danger" to="#leetcode_section" onClick={scrollToLeetcodeSection}>
                                                Leetcode
                                            </Link>
                                        </li>
                                    </>) : (<></>)
                            }

                            <li className="nav-item">
                                <Link className={`nav-link mx-2 ${location.pathname === '#' ? 'active' : ''} btn rounded-0 btn-danger`} to={auth?.user ? "/compiler" : "/login"}>
                                    Compiler
                                </Link>
                            </li>
                            {
                                !auth?.user ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link mx-2 ${location.pathname === '/login' ? 'active' : ''} btn rounded-0 btn-danger`} to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link mx-2 ${location.pathname === '/register' ? 'active' : ''} btn rounded-0 btn-danger`} to="/register">
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <li className="nav-item">
                                                <Link className={`nav-link mx-2 ${location.pathname === '/profile' ? 'active' : ''} btn rounded-0 btn-danger`} to="/profile">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link onClick={handleLogout} className="nav-link mx-2 btn rounded-0 btn-danger" to="/login">
                                                    Logout
                                                </Link>
                                            </li>
                                        </>
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            {/* <div className="text-center p-3 d-none d-md-block">
                <img src="/static_files/images/logos/beer.png" height={120} alt="Company Logo" />
            </div> */}
        </div>

    )
}

export default Header