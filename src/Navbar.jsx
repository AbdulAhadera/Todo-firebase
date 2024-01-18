
import './Styles/Navbar.css';
import { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
    const [checkLoggedInUser, setCheckLoggedInUser] = useState()
    const auth = getAuth();
    const navigate = useNavigate();

    function signOutUser() {
        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        const authChange = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    setCheckLoggedInUser(user)
                } else {
                    console.log('user is not logged in');
                }
            });
        }
        authChange()

    }, [])
    return (
        <div className='nav'>
            <div className='link-sec'>
                <Link className='nav-links' to='/todo'>Home</Link>
                <Link className='nav-links' to='/about'>About</Link>
            </div>
            {checkLoggedInUser ? (
                <button className='btn' onClick={signOutUser}>Logout</button>
            ) : (
                <Link className='btn' to='/signup'>Signup</Link>
            )}
        </div>
    )
}

export default Navbar;