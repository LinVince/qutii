import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';

export default function FixedTopicLine() {
  return (
    <Paper
      component="form"
      style={{position:"fixed", top:"3px",left:"106px", zIndex:"9999"}}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin:"14px auto",width: 320,height:42 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        {/* <SearchIcon /> */}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
    </Paper>
  );
}