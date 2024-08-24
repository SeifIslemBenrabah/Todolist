import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import { AuthData } from '../../Auth/AuthWrapper'
import Home from '../Home'
const RenderRoutes = () => {
    const {user}= AuthData();
    
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
   </Routes>
  )
}

export default RenderRoutes
