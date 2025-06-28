import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication}) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    console.log("Auth Status: ", authStatus)
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        if(authentication && !authStatus){
            navigate('/login');
        }else if(!authentication && authStatus){
            navigate('/')
        }setLoader(false)
    },[authentication,navigate,authStatus])

  return loader ? <h1>Loading...</h1> : children
}


