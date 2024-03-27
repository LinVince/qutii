import { Checkbox } from '@mui/material';
import React, { useState } from 'react'

export default function CustomCheckBox() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
   <Checkbox checked={checked}
      onChange={handleChange}
      sx={{
        ml: -0.2, p: 0,
        '& .MuiSvgIcon-root': {
          color: checked ? "#034459" : 'currentColor', // Change color when checked
        },
      }}
      {...label}/>
  )
}
