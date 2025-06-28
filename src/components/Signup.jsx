import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth/emailauth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()


  const signUp = async ({...data}) => {
  setError("");
  try {
    const newAccount = await authService.createAccount({...data});
    if(newAccount){
      const loggin = await authService.login(newAccount.email, newAccount.password);
      dispatch(login({newAccount}));
      navigate('/');
    }
  } catch (error) {
    setError(error.message);
  }
};


  return (
    <div className='flex items-center justify-center'>
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-8 border border-black">
        <div className="mb-2 flex justify center">
          <span className='inline-block w-full max-w-[100px] m-auto'>
            <Logo width='40%' />
          </span>
        </div>
        <h2 className='text-center text2xl font-bold leading-tight'>
          Sign up to create account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Already have an account?
          <Link to='/login' className='font-medium text-black text-primary transition-all duration-200 hover:underline'>Log In</Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(signUp)} className='mt-4'>
          <Input
          className='mb-2'
            type='text'
            label='Name'
            placeholder='Enter Your Name'
            {...register('name', { required: true })}
          />
          <Input
            className='mb-2'
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
           className='mb-4'
            label='Password'
            type="text"
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^.{4,}$/,
                message:
                  'Password must be at least 4 characters',
              },
            })}
          />
          <div className="flex justify-center m-auto mb-2">
              <input required id='checkbox' className='border-1 w-4 cursor-pointer mr-2' height='20px' width='20px' type="checkbox" />
              <label htmlFor="checkbox">I accept to the  terms and conditions</label>
            </div>
          <Button className='w-full bg-black text-white rounded-sm'>Register</Button>
        </form>
      </div>
    </div>
  )
}
