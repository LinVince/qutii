import React, { useState } from 'react'
import {BaseTextFieldProps, TextField} from '@mui/material';


export default function TextInput(props: Readonly<BaseTextFieldProps>) {
    const [focused, setFocused] = useState(false);

    const { sx, ...otherAttrs } = props;
    

  const handleFocusChange = () => {
    setFocused(true);
  };
  const handleBlurChange = (event) => {
    setFocused(event.target.value !== '');
  };
  
  return (
    <TextField 
      InputLabelProps={{
        className: focused ? 'focused' : '',
        sx: {
          my: focused ? 0 : -1, // Adjust the label margin top value
          color: "#034459",
          '&.Mui-focused': {
              borderColor: 'transparent', // Remove the blue outline
              color: "#034459"
          },
        },
      }}
      sx={{ 
        '& .focused': { fontSize: '1.2rem' }, 
        '& .MuiInput-root::after': {
            borderColor: 'transparent', // Remove the blue outline
        }, 
        ...sx 
      }}
      fullWidth variant="standard" {...otherAttrs} 
      onFocus={handleFocusChange} onBlur={handleBlurChange} 
    />
  )
}
