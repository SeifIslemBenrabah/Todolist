import React from 'react'

const Comment = ({ comment, src,user }) => {
  return (
    <div className='relative'>
        <div>
        <div className='z-20 bg-transparent rounded-full w-20 overflow-hidden absolute'>
            <img src={src} alt='profile'/>
        </div>
      <div className='z-0 bg-transparent absolute w-[420px] h-[250px]'>
        <div  className='bg-sand mt-9 w-10/12 ml-12 h-3/5 rounded-lg flex flex-col overflow-auto relative'>
        <h1 className='ml-20 font-montserrat text-xl text-secondary mt-1'>{user}</h1>
        <p className='ml-6 absolute top-14'>{comment}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Comment
