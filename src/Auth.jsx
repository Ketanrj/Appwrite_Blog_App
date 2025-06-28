import { googleLogin} from "./appwrite/auth/googleAuth";
import { FaGoogle } from "react-icons/fa";
import './App.css'

const Auth = () => {
    return (
        <div className="w-full h-screen">
            <div className="flex items-center justify-center min-h-screen bg-gray-100 h-screen">
                <button className="flex items-center gap-2 px-4 py-2 text-lg font-small bg-white shadow-md rounded-xl hover:bg-gray-100 border border-gray-200 cursor-pointer"
                onClick={googleLogin}>
                    <FaGoogle className="text-xl"/> Continue with Google
                </button>
            </div>
        </div>
    )
}

export default Auth;