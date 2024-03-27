import React from 'react'
import { Box, Divider, Hidden } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function VerifyIdentity() {
  const navigate = useNavigate();

  const useDifferentAccount = () => {
    navigate('/login')
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
      <Box style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: 'auto', margin: 'auto', height: "100vh"}}>
        <Box style={{justifyContent: 'center', width: '80%'}}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <img width="20px" src='logo.png' alt='qutii-icon-logo' />
            <img width="60px" style={{marginLeft: "5px"}} src='qutii.png' alt='qutii-text-logo' />
          </Box>
          <Box sx={{mt: 1}}>
            <span style={{color: "#2E2C34", fontSize: "36px", fontWeight: "500"}}>Verify your identity</span>
          </Box>
          <Box sx={{mt: 1}}>
            <span>Select a way to receive the verification code</span>
          </Box>
          
  
        <Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 5}}>
            <Box sx={{display: 'flex', alignItems: 'start'}}>
              <img src='icon/mail.svg' alt='' />
              <Box sx={{display: 'flex', flexDirection: 'column', ml: 2}}>
                <span>Email code to</span>
                <span style={{fontWeight: '600', fontSize: '16px', marginTop: '10px'}}>maxbert22@email.com</span>
              </Box>
            </Box>
            <Box>
              <img src='icon/chevron-right.svg' alt='' />
            </Box>
          </Box>

          <Divider sx={{mt: 5}} />

          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 5}}>
            <Box sx={{display: 'flex', alignItems: 'start'}}>
              <img src='icon/message.svg' alt='' />
              <Box sx={{display: 'flex', flexDirection: 'column', ml: 2}}>
                <span>Text code to number in -27</span>
                <span style={{width: '50%', fontSize: '14px', marginTop: '10px'}}>Our text are free, but some service providers may apply usage charges in certain cases.</span>
              </Box>
            </Box>
            <Box>
              <img src='icon/chevron-right.svg' alt='' />
            </Box>
          </Box>
        </Box>

      <Divider sx={{mt: 3}} />

      <Box sx={{mt: 3}} style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#034459'}}>
        <span onClick={useDifferentAccount} style={{fontWeight: '600', cursor: 'pointer'}}>Sign in to a different account</span>
      </Box>
         

        </Box>

    </Box>
      
    </Box>
  )
}
