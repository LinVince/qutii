import React from 'react';
import {Paper, Box} from '@mui/material';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';

type SearchProp = {
  params?: InputBaseProps;
  placeholder: string
}

export default function CustomInput({params, placeholder}: Readonly<SearchProp>) {
  const _sx = params?.sx

  return (
    <Box id="input-parent">
       <Paper
      sx={{ width: "100%", height: '35px', display: 'flex', boxShadow: 'none', border: 'solid 1px #EBEAED' }}
    >
      <InputBase
        {...params}
        sx={{ ml: 1, flex: 1, color: '#136682', ..._sx }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder, sx: {
                '&.MuiInputBase-input': {
                  p: '5px'
                },
                '&.MuiInputBase-input:hover': {
                  border: 'none'
                },
                '&::placeholder': { color: '#136682' } 
              } }}
      />
    </Paper>
    </Box>
  );
}
