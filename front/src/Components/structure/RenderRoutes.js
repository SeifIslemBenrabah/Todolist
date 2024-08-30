import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { AuthData } from '../../Auth/AuthWrapper'
import Login from '../Login'
import Signup from '../Signup'
import Home from '../Home'
import List from '../List'
import Dashboard from '../Dashboard'
import Projects from '../Projects'
import Tasks from '../Tasks'
const RenderRoutes = () => {
    const {user}= AuthData();
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    {user.isAuthenticated &&(
      
      <Route path='/list' element={<List/>}>
        <Route path='Dashboard' element={<Dashboard/>}/>
        <Route path='Allprojects' element={<Projects/>}/>
        <Route path='Alltasks' element={<Tasks/>}/>
      </Route>
    )
    }
   </Routes>
  )
}

export default RenderRoutes
