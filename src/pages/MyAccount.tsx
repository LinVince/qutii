import { Box, Button, Checkbox, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Sidebar, { SidebarContext } from '../components/Sidebar'
import SettingSection from '../components/Account/SettingSection'
import CustomInput from '../components/CustomInput'
import SettingNavigation from '../components/Account/SettingNavigation'

export default function MyAccount() {


  useEffect(()  => {
    document.body.style.overflow = 'hidden';
});

  return (
    <Sidebar>
      <Account />
    </Sidebar>
  )
}

export function Account() {

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const {showLeftbar } = useContext(SidebarContext)

  return (
    <Box className="manrope-font" sx={{display: 'flex', background: '#EEF5F7', color: '#000', height: '100vh', marginLeft: `${showLeftbar ? '86px' : '0px'}`, paddingTop: '20px', overflow: 'scroll'}}>
      <Box sx={{margin: 'auto', width: isLargeScreen ? '80%' : '100%', display: 'flex', height: '100%'}}>
        <Box sx={{width: '40%'}}>
          <Box sx={{fontSize: '48px', fontWeight: 'bold', color: '#2E2C34'}}>My Account</Box>
          <Box sx={{color: '#58565D'}}>
            <span>Update and manage your account</span>
          </Box>
          <Box sx={{mt: '30px'}}>
            <SettingNavigation />
            <Box sx={{ml: '20px', mt: '20px', color: '#034459', fontWeight: 'bold'}}>
              <span>Log out</span>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '60%', paddingX: '10px'}}>
          <Box>
            <Box sx={{background: '#fff', color: '#2E2C34', borderRadius: '5px', pt: '20px', pl: '20px', fontSize: '18px', fontWeight: '600'}}>
              Account Settings
            </Box>
            {/* password */}
            <SettingSection title="Password" subText=''>
               <Box sx={{width: '70%'}}>
                  <Box sx={{mt: '10px'}}>
                    <CustomInput placeholder="Current Password" />
                  </Box>
                  <Box sx={{mt: '10px'}}>
                    <CustomInput placeholder="New Password" />
                  </Box>
                  <Box sx={{color: '#DAE5E1', fontSize: '12px', mt: '2px'}}>
                    <span>Minimum of 6 characters</span>
                  </Box>
                  <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button sx={{background: '#034459', width: '50%', py: '10px', ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}} variant="contained">Save Changes</Button>
                      
                    <Box sx={{fontSize: '14px', ml: '20px'}}>
                      <span style={{color: "#DAE5E1"}}>Can't remember your current password?</span>
                      <h4 style={{color: '#136682', display: 'inline'}}> Reset Password</h4>
                    </Box>
                  </Box>
              </Box>
            </SettingSection>

            {/* email */}
            <SettingSection sx={{marginTop: '3px'}} title="Email Address" subText='Your email address is maxbert22@email.com'>
              <Box sx={{width: '70%'}}>
                  <Box sx={{mt: '10px'}}>
                    <CustomInput placeholder="Current Email" />
                  </Box>
                  <Box sx={{mt: '10px'}}>
                    <CustomInput placeholder="New Email" />
                  </Box>
                  <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button sx={{background: '#034459', py: '10px', ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}} variant="contained">Update Email</Button>
                  </Box>
              </Box>
              </SettingSection>

            {/* language */}
            <SettingSection sx={{marginTop: '3px'}} title="Language" subText="Choose the language you’d like to use with Substance. Your language is currently set to: " emp="English (UK)">
              <Box sx={{width: '70%'}}>
                  <Box className="dd-parent" sx={{mt: '10px', border: 'solid 1px #E6ECEE', borderRadius: '5px', position: 'relative'}}>
                    <select className='dd' style={{width: '100%', color: "#2E2C34", borderRadius: '5px', padding: '10px', border: 'none'}}>
                      <option>English (UK)</option>
                      <option>English (US)</option>
                      <option>French</option>
                    </select>
                  </Box>
                  <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button sx={{background: '#034459', py: '10px', ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}} variant="contained">Save Language</Button>
                  </Box>
              </Box>
              </SettingSection>

            {/* time zone */}
            <SettingSection sx={{marginTop: '3px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}} title="Time Zone" subText="QuTii uses your time zone to send summary and notification emails, for times in your activity feeds. Your time zone is currently set to " emp="(UTC -6.00) Greenwich Mean Time">
              <Box sx={{width: '70%'}}>
                  <Box className="dd-parent" sx={{mt: '10px', border: 'solid 1px #E6ECEE', borderRadius: '5px', position: 'relative'}}>
                    <select className='dd' style={{width: '100%', color: "#2E2C34", borderRadius: '5px', padding: '10px', border: 'none'}}>
                      <option>(UTC -6.00) Greenwich Mean Time</option>
                      <option>(UTC -5.00) Greenwich Mean Time</option>
                      <option>(UTC -4.00) Greenwich Mean Time</option>
                    </select>
                  </Box>
                  <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button sx={{background: '#034459', py: '10px', ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}} variant="contained">Save time zone</Button>
                  </Box>
              </Box>
            </SettingSection>

            {/* Delete Account */}
            <SettingSection sx={{marginTop: '30px', borderRadius: '5px'}} title="Delete your account" subText="Deleting your account will result in the permanent loss of your account data. You can cancel the deletion for 14 days." showToggleButton={false}>
              <Box sx={{width: '70%'}}>
                  <Box sx={{mt: '10px', display: 'flex', alignItems: 'center'}}>
                    <Checkbox sx={{width: '24px', height: '24px', '&.Mui-checked': {color: '#034459'}}} defaultChecked />
                    <span style={{color: '#84818A', fontSize: '14px'}}>I confirm that I want to delete my account</span>
                  </Box>
                  <Box sx={{marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button sx={{background: '#EF6262', py: '10px', ':hover': {background: '#04526c'}, ':focus': {outline: "none"}}} variant="contained">Delete Account</Button>
                  </Box>
              </Box>
            </SettingSection>
          </Box>
        </Box>
      </Box>

      
    </Box>
  )
}
