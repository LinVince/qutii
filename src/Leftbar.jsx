import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import Logo from "./components/logo.jsx"

export default function Left_Bar(props) {
  return (
    <div className='leftbar'>
        
       
      <Toolbar >
        
     
      <Logo />
      </Toolbar>

      <Toolbar >
        <SvgIcon>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="4" fill="#034459" fill-opacity="0.08" />
            <path d="M32.5 15L32.34 15.03L27 17.1L21 15L15.36 16.9C15.15 16.97 15 17.15 15 17.38V32.5C15 32.78 15.22 33 15.5 33L15.66 32.97L21 30.9L27 33L32.64 31.1C32.85 31.03 33 30.85 33 30.62V15.5C33 15.22 32.78 15 32.5 15ZM27 31L21 28.89V17L27 19.11V31Z" fill="#034459" />
          </svg>
        </SvgIcon>
      </Toolbar>
      <Toolbar >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 18L21 19V3C21 1.9 20.1 1 19 1H8.99C7.89 1 7 1.9 7 3H17C18.1 3 19 3.9 19 5V18ZM15 5H5C3.9 5 3 5.9 3 7V23L10 20L17 23V7C17 5.9 16.1 5 15 5Z" fill="#4B7D94"/>
</svg>

      </Toolbar>
      <Toolbar style={{ position: "fixed", left: "0" }}>
        <SvgIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#4B7D94" />
          </svg>
        </SvgIcon>

      </Toolbar>
    </div>
  )
}