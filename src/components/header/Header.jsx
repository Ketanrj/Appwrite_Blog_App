import React from 'react'
import { Link } from 'react-router-dom'
import {Container, LogoutBtn, Logo} from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name : "Home",
            slug : '/',
            active : true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
  return (
    <header className='py-3 shadow bg-gray-200'>
    <Container>
        <nav  className='flex'>
            <div className='mr-4 inline-block'>
                <Link to='/'>
                <Logo width='24px'/>
                </Link>
            </div>
            <ul className='flex ml-auto'>
            {navItems.map((items)=> (
            items.active ? (
                <li key={items.name}>{
                    <button onClick={() => navigate(items.slug)} className='inline-bock px-6 py-2 duration-100 hover:bg-gray-400 hover:text-white rounded-full mr-2 cursor-pointer'>
                        {items.name}
                    </button>
                }</li>
            ) : null
            ))}
            {authStatus && (
            <li>
                <LogoutBtn /></li>
            )}
            </ul>
        </nav>
    </Container>
    </header>
  )
}

export default Header