import React from 'react'
// import { logoutUser } from '../../appwrite/auth/googleAuth'
import authService from '../../appwrite/auth/emailauth';
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function LogoutBtn(props) {
    const { className, ...prop } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handlelogout() {
        authService.logout()
            .then(() =>
                dispatch(logout()),
                navigate('/'))

            .catch((error) => console.log('Error while logging out', error))

    }

    return <button className={`inline-bock px-6 bg-black text-white py-2 duration-200 hover:bg-gray-600 rounded-full cursor-pointer ${className}`} onClick={handlelogout}>Logout</button>;
}

export default LogoutBtn