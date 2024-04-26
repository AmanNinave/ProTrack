import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import Filldata from '../Pages/Filldata';
import Task from '../Pages/Task';
import Add_Picker from '../Pages/Add_Picker';
import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
function AllRoutes(props) {
    return (
        <>
            <Routes>
                <Route path='/login' element={ <Login/>}></Route>
                <Route path='/'  element={ <PrivateRoute> <Navbar/> <Home/> </PrivateRoute>}> </Route>
                <Route path='/dashboard'  element={ <PrivateRoute><Navbar/>  <Dashboard/> </PrivateRoute> }  ></Route>
                <Route path='/fill' element={ <PrivateRoute> <Navbar/><Filldata/> </PrivateRoute> }></Route>
                <Route path='/task' element={<PrivateRoute> <Navbar/><Task/> </PrivateRoute> }></Route>
                <Route path='/addpicker' element={<PrivateRoute> <Navbar/> <Add_Picker/> </PrivateRoute> }></Route>
                
            </Routes>    
        </>
    );
}

export default AllRoutes;