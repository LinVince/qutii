import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    // Style overrides for Tab component
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#156582', // Text color for unselected tabs
          '&.Mui-selected': {
            color: '#156582', // Text color for the selected tab
          },
          '&:focus': {
            outline: 'none', // Remove border or outline on focus
            backgroundColor: 'transparent', // Optional: in case you want to remove or change background color on focus
          },
        },
      },
    },
    // Style overrides for Tabs component
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#156582', // Indicator color
        },
      },
    },
  },
  typography: {
    fontFamily: 'Raleway, Arial',
  },
});
