import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import { AuthData } from '../../Auth/AuthWrapper'
import Login from '../Login'
import Signup from '../Signup'
import Home from '../Home'
import List from '../List'
import Dashboard from '../Dashboard'
import Projects from '../Projects'
import Tasks from '../Tasks'
import ProjectDetail from '../ProjectDetail'
import NotFound from '../NotFound'
const RenderRoutes = () => {
    const {user}= AuthData();
    
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    {user.isAuthenticated &&(
      
      <Route path='/list' element={<List/>}>
         <Route index element={<Navigate to="dashboard" />} />
        <Route index path='Dashboard' element={<Dashboard/>}/>
        <Route path='Allprojects' element={<Projects/>}/>
        <Route path=':ProjectId' element={<ProjectDetail/>}/>
        <Route path='Alltasks' element={<Tasks/>}/>
      </Route>
    )
    }
    <Route path='*' element={<NotFound/>}/>
   </Routes>
  )
}

export default RenderRoutes
