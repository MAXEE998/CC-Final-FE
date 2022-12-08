import React from 'react';
import { Route } from 'react-router-dom';

import Error from './pages/Error';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';


const routes = [
  <Route path='/' element={<Landing isPatient={true}/>} />,
  <Route path='/patient' element={<Landing isPatient={true}/>} />,
  <Route path='/patient/signin' element={<SignIn isPatient={true}/>} />,
  <Route path='/doctor' element={<Landing isPatient={false}/>} />,
  <Route path='/doctor/signin' element={<SignIn isPatient={false}/>} />,
  <Route path='/*' element={<Error />} />,
]

export default routes;
