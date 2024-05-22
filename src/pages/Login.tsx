import React from 'react'
import { Box, Button, Divider, Hidden } from '@mui/material'
import TextInput from '../components/TextInput';
import OAuthButton from '../components/OAuthButton';
import { Link } from 'react-router-dom';


export default function Login() {
  
  return (
    <Box className="raleway-font" style={{background: 'white', color: '#2E2C34', display: 'flex'}}>
      <Hidden mdDown>
        <Box sx={{
          height: "100vh",
          backgroundImage: "url('misc-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "50%"
        }} />
      </Hidden>
      <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto', margin: 'auto', height: "100vh"}}>
        <Box style={{justifyContent: 'center', width: '90%'}}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <img width="20px" src='logo.png' alt='qutii-icon-logo' />
            <img width="60px" style={{marginLeft: "5px"}} src='qutii.png' alt='qutii-text-logo' />
          </Box>
          <Box sx={{mt: 1}}>
            <span style={{color: "#2E2C34", fontSize: "36px", fontWeight: "500"}}>Sign in</span>
          </Box>
          <Box sx={{mt: 1}}>
            <span>New user?</span>
            <Link to="/signup">
              <span style={{color: "#034459", fontWeight: "500"}}> Create an account</span>
            </Link>
          </Box>
          <Box sx={{mt:3}}>
            <TextInput id="email" label="Email address" sx={{my: 2}} />
            <TextInput id="password" label="Password" sx={{my: 2}} />
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
              <span style={{color: "#034459"}}>Forget Password?</span>
              <Button variant="contained" sx={{background: "#034459", px: 8, py: 1.5, ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}}>Sign In</Button>
          </Box>
          <Divider sx={{my: 2}}>or</Divider>
          <Box>
            <OAuthButton sx={{mt: 2}} text="Sign in with google" icon="ic_google.png" />
            <OAuthButton sx={{mt: 2}} text="Sign in with facebook" icon="ic_fb.png" />
          </Box>
          <Box sx={{mt: 4, color: "#9AB4BD"}}>
            <span style={{fontSize: 12}}>Protected by reCAPTCHA and subject to the QuTii <span style={{color: "#034459", fontWeight: '600'}}>Privacy Policy</span> and <span style={{color: "#034459", fontWeight: '600'}}>Terms of Service</span>.</span>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
