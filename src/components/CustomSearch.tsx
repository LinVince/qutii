import React, { ReactNode } from 'react';
import { Paper, Box } from '@mui/material';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

type SearchProp = {
  position?: 'before' | 'after';
  params?: InputBaseProps;
  children?: ReactNode;
};

export default function CustomSearch({
  params,
  children,
  position = 'after',
}: Readonly<SearchProp>) {
  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down('sm'));

  // prevent body from shifting on mobile view
  const preventBodyFromShifting = () => {
    if (isMediumScreenDown) {
      document.body.style.position = 'fixed';
    }
  };

  const removeFixedBody = () => {
    document.body.style.position = 'unset';
  };

  return (
    <Box id="input-parent">
      <Paper
        sx={{
          width: '100%',
          height: '35px',
          display: 'flex',
          boxShadow: 'none',
          border: 'solid 1px #EBEAED',
        }}
      >
        {position === 'before' && children}

        <InputBase
          {...params}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Topic..."
          inputProps={{
            'aria-label': 'search topic',
            sx: {
              '&.MuiInputBase-input': {
                p: '5px',
              },
              '&.MuiInputBase-input:hover': {
                border: 'none',
              },
            },
          }}
          onFocus={preventBodyFromShifting}
          onBlur={removeFixedBody}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon sx={{ color: '#4B7D94' }} />
        </IconButton>
        {position === 'after' && children}
      </Paper>
    </Box>
  );
}
