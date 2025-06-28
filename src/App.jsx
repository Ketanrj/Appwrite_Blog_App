// import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from './appwrite/auth/emailauth'
import { Header, Footer } from './components/'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    try {
      authService.getCurrentuser().then((userData) =>{
        if(userData){
          dispatch(login({ userData }));
          console.log("User data:", userData);
          navigate('/');
        }else{
          navigate('/login');
        }
      }).finally(() => setLoading(false))
    } catch (error) {
      console.log("Error in loading userdata", error)
    }
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-100'>
      <div className='w-full block'>
       <Header />
        <main>
       <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App


{/* <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer /> */}