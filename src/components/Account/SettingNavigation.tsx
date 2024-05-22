import { Box, SvgIconTypeMap } from '@mui/material'
import React, { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Props = {}

type NavigationProp = {
  title: string,
  isActive: boolean,
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
}

export default function SettingNavigation({}: Props) {
  const navigations: NavigationProp[] = [
    {
      title: 'Edit Profile',
      isActive: true,
      icon: AccountBoxIcon
    },
    {
      title: 'Account Settings',
      isActive: false,
      icon: SettingsApplicationsIcon
    },
    {
      title: 'Notifications',
      isActive: false,
      icon: NotificationsIcon
    },
  ];
  
  const [activeNavigation, setActiveNavigation] = useState(navigations[0].title);
  
  const isActive = (navigation: NavigationProp) => {
    return activeNavigation === navigation.title
  }

  const setNavigation = (navigation: NavigationProp) => {
    setActiveNavigation(navigation.title)
  }


  return (
    <Box>
      {
        navigations.map(navigation => {
          return (
            <Box sx={{display: 'flex', alignItems: 'center', p: '20px', color: isActive(navigation) ? '#034459' : '#58565D', fontWeight: 'bold', bgcolor: isActive(navigation) ? '#d2e8e4' : '', cursor: 'pointer'}} onClick={() => setNavigation(navigation)}>
              <navigation.icon sx={{width: '35px', height: '35px'}} />
              <span style={{marginLeft: '20px', color: isActive(navigation) ? '#034459' : '#2E2C34'}}>{navigation.title}</span>
            </Box>
          )
        })
      }
    </Box>
  )
}
