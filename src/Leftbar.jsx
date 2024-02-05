import React, { useEffect } from 'react';
import { useState, useMemo,useLayoutEffect, } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import Logo from "./components/logo.jsx"
let clickStyle={
  overview:null,
  bookmark:null,
  personal:null
};
export default function Left_Bar(props) {
  let {setDrawerStatus,drawerStatus}=props;
  function ButtonClick(currentButton){
    if(drawerStatus===currentButton){
       let currentBackground={
        backgroundColor: "#fff"
      };
      clickStyle={
        [currentButton]:currentBackground
      }
      setDrawerStatus(false);
      return
    }
    if(currentButton){
      let currentBackground={
        backgroundColor: "#f0f0f0"
      };
     
      clickStyle={
        [currentButton]:currentBackground
      }
      setDrawerStatus(currentButton)
    }
    
  }

 
const setColor=(currentButton,color) =>{
  let currentBackground={
    backgroundColor: color
  };
 
  clickStyle={
    [currentButton]:currentBackground
  }
  return clickStyle
}


useEffect(()=>{
  if(props.drawerStatus === "overview" && !clickStyle.overview){
    let currentBackground={
      backgroundColor: "#f0f0f0"
    };
   
    clickStyle={
      ["overview"]:currentBackground
    }
  }
  // setColor(drawerStatus,"f0f0f0")
},[props.drawerStatus])


  return (
    <div className='leftbar'>
      <Toolbar >
        <Logo />
      </Toolbar>
      <Toolbar >
        <a className='LeftbarIcon' style={clickStyle.overview} onClick={()=>ButtonClick("overview")}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 0L17.34 0.03L12 2.1L6 0L0.36 1.9C0.15 1.97 0 2.15 0 2.38V17.5C0 17.78 0.22 18 0.5 18L0.66 17.97L6 15.9L12 18L17.64 16.1C17.85 16.03 18 15.85 18 15.62V0.5C18 0.22 17.78 0 17.5 0ZM12 16L6 13.89V2L12 4.11V16Z" fill="#034459" />
          </svg>
        </a>
      </Toolbar>
      <Toolbar >
        <a className='LeftbarIcon' style={clickStyle.bookmark} onClick={()=>ButtonClick("bookmark")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 18L21 19V3C21 1.9 20.1 1 19 1H8.99C7.89 1 7 1.9 7 3H17C18.1 3 19 3.9 19 5V18ZM15 5H5C3.9 5 3 5.9 3 7V23L10 20L17 23V7C17 5.9 16.1 5 15 5Z" fill="#4B7D94" />
          </svg>
        </a>
      </Toolbar>
      <Toolbar style={{ position: "fixed", left: "0" }}>
        <a className='LeftbarIcon' style={clickStyle.personal} onClick={()=>ButtonClick("personal")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#4B7D94" />
          </svg>
        </a>
      </Toolbar>
    </div>
  )
}