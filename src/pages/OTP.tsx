import { Box, Button, Divider, Hidden } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const verifyIdentity = () => {
    navigate('/verify-identity')
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
        <Box style={{justifyContent: 'center', width: '50%'}}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <img width="20px" src='logo.png' alt='qutii-icon-logo' />
            <img width="60px" style={{marginLeft: "5px"}} src='qutii.png' alt='qutii-text-logo' />
          </Box>
          <Box sx={{mt: 1}}>
            <span style={{color: "#2E2C34", fontSize: "36px", fontWeight: "500"}}>Update your password</span>
          </Box>
          <Box sx={{mt: 1}}>
            <span>Enter the code we sent to the phone number ending in -27</span>
          </Box>
          
          <OtpInput
      value={otp}
      onChange={setOtp}
      inputType='number'
      numInputs={4}
      shouldAutoFocus
      containerStyle={{display: 'flex', justifyContent: 'space-between'}}
      renderInput={(props) => <input {...props} style={{border: '1px solid #E6ECEE', fontSize: '36px', marginTop: '10px', padding: '30px', width: '30px', textAlign: 'center'}} />}
    />

      <Box sx={{mt: 3}} style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#034459'}}>
        <span>Back</span>
        <span style={{fontWeight: '600'}}>Didn't receive your code?</span>
      </Box>

      <Divider sx={{mt: 3}} />

      <Box sx={{mt: 3}} style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#034459'}}>
        <span onClick={verifyIdentity} style={{fontWeight: '600', cursor: 'pointer'}}>Get your code with another way</span>
      </Box>
         

        </Box>
        
{/* resend code */}
      <Box sx={{mt: 5}} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%', background: '#034459', borderRadius: '4px', padding: '30px'}}>
        <Box sx={{width: '70%'}}>
          <span style={{color: '#fff'}}>Didn’t receive your code? please allow 30 seconds for the message to arrive before requesting another code. Get help</span>
        </Box>
        <Box>
          <Button sx={{bgcolor: '#fff', color: '#034459', fontWeight: '600', fontSize: '14px'}}>Resend code</Button>
        </Box>
      </Box>

      </Box>
      
    </Box>
  )
}
