import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export interface IBottomNavigation {
  currentActive: string;
  changeHandler: any;
}

export default function Navigation({ currentActive, changeHandler }: IBottomNavigation) {
  const handleChange = (event: React.SyntheticEvent, newTag: string) => {
    if (changeHandler && newTag !== currentActive) {
      changeHandler(newTag);
    }
  };

  return (
    <BottomNavigation value={currentActive} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Appointments"
        value="appointments"
        icon={<CalendarMonthIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<AssignmentIndIcon />}
      />
    </BottomNavigation>
  );
}
