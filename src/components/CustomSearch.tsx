import React, { ReactNode } from 'react';
import {Paper, Box} from '@mui/material';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type SearchProp = {
  params?: InputBaseProps;
  children?: ReactNode
}

export default function CustomSearch({params, children}: Readonly<SearchProp>) {

  return (
    <Box>
       <Paper
      sx={{ width: "100%", height: '35px', display: 'flex', boxShadow: 'none', border: 'solid 1px #EBEAED' }}
    >
      <InputBase
        {...params}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Topic..."
        inputProps={{ 'aria-label': 'search topic', sx: {
                '&.MuiInputBase-input': {
                  p: '5px'
                },
                '&.MuiInputBase-input:hover': {
                  border: 'none'
                }
              } }}
      />
      <IconButton type="button" sx={{ }} aria-label="search">
        <SearchIcon sx={{color: '#4B7D94'}} />
      </IconButton>
      {
        children
      }
    </Paper>
    </Box>
  );
}
