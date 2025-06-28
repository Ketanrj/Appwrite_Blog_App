import React from 'react'
import img from '../assets/icons8-create-96.png'


function Logo({width = '80px'}) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={img} width={width} />
      <h3 className='font-medium font-mono text-sm'>We-write</h3>
    </div>
  )
}

export default Logo