import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth/emailauth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {GoogleLogin} from './index'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const { error, setError } = useState('')

  const login = async ({...data}) => {
    try {
      const session = await authService.login({...data});
      if (session) {
        const userData = await authService.getCurrentuser()
        if (userData) {
          dispatch(login({ userData }));
          console.log("User data:", userData);
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10">
          <div className="flex justify-center m-auto mb-2">
            <span className='inline-block w-full max-w-[100px] m-auto'>
            <Logo width='40px' />
          </span>
          </div>
                <GoogleLogin/>
        <div className="flex justify center">
        <h2 className='text-center textxl font-medium leading-tight m-auto'>
          Signin to your account
        </h2>
        </div>
        <p className='text-center text-base text-black/40'>
          Dont have an account?
          <Link to='/signup' className='text-black transition-all duration-200 hover:underline mt-1 ml-1'>Signup</Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form className='mt-8' onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your Email:"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email address must be valid",
                },
              })}
            />
            <Input
              label='Password'
              type='Password'
              placeholder='Enter your password'
              {...register('password', { required: true })}
            />
            <Button className='w-full text-white rounded xl bg-black'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login