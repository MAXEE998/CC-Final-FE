import React from 'react';
import { Route } from 'react-router-dom';


import Error from './pages/Error';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateAppointment from './pages/CreateAppointment';
import Chat from './pages/Chat';
import ChooseDoctor from './pages/ChooseDoctor';
import AppointmentSummary from './pages/AppointmentSummary';
import PatientDashboard from './pages/PatientDashboard';


const routes = [
  <Route path='/' element={<Landing isPatient={true}/>} />,
  <Route path='/patient' element={<Landing isPatient={true}/>} />,
  <Route path='/patient/signin' element={<SignIn isPatient={true}/>} />,
  <Route path='/patient/signup' element={<SignUp isPatient={true}/>} />,
  <Route path='/patient/createAppointment' element={<CreateAppointment />} />,
  <Route path='/patient/chatbot' element={<Chat />} />,
  <Route path='/patient/appointmentSummary' element={<AppointmentSummary />} />,
  <Route path='/patient/chooseDoctor' element={<ChooseDoctor />} />,
  <Route path='/patient/dashboard/*' element={<PatientDashboard/>} />,
  <Route path='/doctor' element={<Landing isPatient={false}/>} />,
  <Route path='/doctor/signin' element={<SignIn isPatient={false}/>} />,
  <Route path='/doctor/signup' element={<SignUp isPatient={false}/>} />,
  <Route path='/*' element={<Error />} />,
]

export default routes;
