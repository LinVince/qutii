import { Box, Button, Hidden } from '@mui/material'
import React from 'react'
import TextInput from '../components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import CustomCheckBox from '../components/CustomCheckBox';


export default function SignUp() {
  const navigate = useNavigate();

  const gotoOtp = () => {
    navigate('/otp')
  }
  return (
    <Box className="raleway-font" style={{background: 'white', color: '#2E2C34', display: 'flex'}}>
      <Hidden mdDown>
        <Box sx={{
          background: 'red',
          height: "100vh",
          backgroundImage: "url('misc-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "50%"
        }} />
      </Hidden>
      <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto', margin: 'auto', height: "100vh", padding: 10}}>
        <Box style={{justifyContent: 'center', width: '100%'}}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <img width="20px" src='logo.png' alt='qutii-icon-logo' />
            <img width="60px" style={{marginLeft: "5px"}} src='qutii.png' alt='qutii-text-logo' />
          </Box>
          <Box sx={{mt: 1}}>
            <span style={{color: "#2E2C34", fontSize: "36px", fontWeight: "500"}}>Create an account</span>
          </Box>
          <Box sx={{mt: 1}}>
            <span>Already have an account?</span>
            <Link to="/login">
              <span style={{color: "#034459", fontWeight: "500"}}> Sign in</span>
            </Link>
          </Box>
          
          <Box sx={{mt:3}}>
            <TextInput id="email" label="Email address" sx={{my: 2}} />
            <Box sx={{display: 'flex'}}>
              <TextInput fullWidth={false} id="email" label="First name" sx={{my: 2, pr: 1, width: '50%'}} />
              <TextInput fullWidth={false} id="email" label="Last name" sx={{my: 2, width: '50%'}} />
            </Box>
            <TextInput id="password" label="Password" sx={{my: 2}} />
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
              <Button onClick={gotoOtp} variant="contained" sx={{background: "#034459", px: 8, py: 1.5, width: '100%', ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}}>Sign Up</Button>
          </Box>

          <Box sx={{mt: 4, color: "#9AB4BD", display: 'flex', alignItems: 'start'}}>
            <CustomCheckBox />
            <Box>
              <span style={{fontSize: 12}}>By clicking Create account, I agree that I have read and accepted the <span style={{color: "#034459", fontWeight: '600'}}>Privacy Policy</span> and <span style={{color: "#034459", fontWeight: '600'}}>Terms of Service</span>.</span>
            </Box>
          </Box>
         
        </Box>
      </Box>
    </Box>
  )
}
