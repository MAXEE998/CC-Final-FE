import { AxiosResponse } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { matchRoutes, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { confirmAppointment, getDoctorAppointments, getDoctorProfile } from '../../api/apiGateway';
import AppContext from '../../api/AppContext';
import BaseContainer from '../../components/BaseContainer';

import Navigator from '../../components/BottomNavigator';
import Appointments from './Appointments';

import Home from './Home'
import Profile from './Profile';

export default function DoctorDashboard() {
  const ctx = React.useContext(AppContext);
  const [tag, setTag] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const matches = matchRoutes([{path: '/doctor/dashboard/:tag'}], location);
  const urlTag = matches?.[0].params.tag || 'home';

  const userStr = localStorage.getItem('tmd-user');
  const user = !!userStr ? JSON.parse(userStr) : null;
  const isProfileAvailable = !!user?.dob;
  const [name, setName] = useState(isProfileAvailable ? user.fname + ' ' + user.lname : '');
  const [appointment, setAppointments] = useState<any[]>([]);

  const fetchAppointments = () => {
    ctx.setBackDropStatus?.(true);
    getDoctorAppointments(ctx.user.email).then(
      (response: AxiosResponse) => {
        const data = response.data
        console.log(data)
        setAppointments(data)
        ctx.setBackDropStatus?.(false);
      })
  }

  const updateAppointment = (id: string, status: string) => {
    const form = {
      AppointmentNumber: id,
      status: status,
    }
    console.log(form)
    confirmAppointment(form).then(() => {fetchAppointments()});
  }

  useEffect(() => {
    if (!user) {
      navigate('/doctor');
    }
    fetchAppointments()
  }, [])

  useEffect(() => {
    if (urlTag !== tag) {
      setTag(urlTag);
    }
  }, [urlTag]);

  useEffect(() => {
    if (!user.dob) {
      ctx.setBackDropStatus?.(true);
      getDoctorProfile(user.email).then(
        (response: AxiosResponse) => {
          const data = response.data
          user.dob = data.dob
          user.gender = data.gender
          user.phonenumber = data.phonenumber
          user.lname = data.lname
          user.fname = data.fname
          localStorage.setItem('tmd-user', JSON.stringify(user));
          setName(data.fname + ' ' + data.lname);
          ctx.setBackDropStatus?.(false);
        })
    }
  }, [])

  const changeHandler = (newTag: string) => {
    setTag(newTag);
    navigate(`/doctor/dashboard/${newTag}`);
  }

  return (<>
    <BaseContainer style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        flex: '1',
        overflow: 'auto',

      }}>
        <Routes>
          <Route path="/" element={<Home name={name} appointments={appointment} updateHandler={updateAppointment}/>}/>
          <Route path="/home" element={<Home name={name} appointments={appointment} updateHandler={updateAppointment}/>}/>
          <Route path="/appointments" element={<Appointments appointments={appointment} updateHandler={updateAppointment}/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
      <Navigator currentActive={tag} changeHandler={changeHandler} isDoctor={true}
                 pendingAppointment={appointment.filter(each => each.appointmentStatus === 'pending').length}
      />
    </BaseContainer>
    </>)
}
