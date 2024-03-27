import { Button, SxProps, Theme } from '@mui/material';
import React from 'react'

type Props = {
  text: string;
  icon: string;
  sx?: SxProps<Theme>
}

export default function OAuthButton({text, icon, sx = {}}: Readonly<Props>) {
  return (
    <Button sx={{border: "1.5px solid #9AB4BD", borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 1, width: "100%", color: "#2E2C34", ':focus': {outline: "none"}, ':hover': {borderColor: "#04526c"}, ...sx}}>
      <img width="15px" src={icon} alt='' />
      <span style ={{marginLeft: "10px"}}>{text}</span>
    </Button>
  )
}
