import React, { useState, useEffect, ReactNode } from 'react';
import {Paper, Box, AutocompleteRenderInputParams} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type SearchProp = {
  params?: AutocompleteRenderInputParams;
  children?: ReactNode
}

export default function CustomSearch({params, children}: SearchProp) {

  return (
    <Box>
       <Paper
      sx={{ width: "100%", height: '35px', display: 'flex', boxShadow: 'none', border: 'solid 1px #EBEAED', 'MuiIconButton-root': {
        color: 'red'
      } }}
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
