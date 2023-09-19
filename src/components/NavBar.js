import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const NavBar = () => {
  const auth  = localStorage.getItem('user');
  const navigate  = useNavigate();


  const logOut = () => {
    localStorage.clear();
    navigate('/');

  }

    return(
        <div>
            <ul className='navbar-ul'>
                {auth ? (
                    <>
                    <li>
                            <Link to="/profile"><FontAwesomeIcon icon={faUser} /> {JSON.parse(auth).name}</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/add-products">Add Product</Link>
                        </li>
                        {/* <li>
                            <Link to="/update">Update</Link>
                        </li> */}
                        
                        <li>
                            <Link onClick={logOut} to="/signUp">
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signUp">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default NavBar;