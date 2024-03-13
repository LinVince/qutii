import React, { useEffect, useMemo } from 'react';
import { useState, useCallback, useContext } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import '../index.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { ThemeProvider, createTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import KnowledgeSearch from './Search';
import Overview from './Overview';
import QuestionsAnswers from './Questions&answer';

const theme = createTheme({
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
});

export default function Knowledge_Drawer(props) {
  const { currentInfo, drawerStatus, setDrawerStatus } = props;

  const [state, setDrawerOpen] = React.useState(false);
  const toggleDrawer = open => {
    setDrawerOpen(open);
  };

  // Controls the opening and closing of the drawer via the currentInfo passed by the parent component.
  // useEffect(() => {

  //   if(currentInfo && !!Object.keys(currentInfo).length){
  //     setDrawerStatus("overview")
  //   }
  // }, [currentInfo])

  const [value, setValue] = useState(0);
  let StateProps = {
    value: value,
    setValue: setValue,
  };
  return (
    <Box sx={{ borderBottom: 1 }} borderWidth={1}>
      <SwipeableDrawer
        open={!!drawerStatus}
        onClose={() => setDrawerStatus(false)}
        onOpen={() => toggleDrawer(true)}
        defaultValue={false}
      >
        {/* Search */}
        <Box sx={{ paddingX: '10px' }}>
          <KnowledgeSearch />
        </Box>

        {/* Knowledge Topic*/}
        {renderDrawerContent(drawerStatus, currentInfo, StateProps)}
      </SwipeableDrawer>
    </Box>
  );
}

function renderDrawerContent(drawerStatus, currentInfo, props) {
  if (drawerStatus) {
    switch (drawerStatus) {
      case 'overview':
        if (currentInfo) {
          return renderOverview(currentInfo, props);
        } else {
          return (
            <Box sx={{ paddingX: '10px' }}>
              Welcome to QuTii Knowledge Map. Navigate the map and click on the
              topic you are interested in and relevant information will be
              displayed here.
            </Box>
          );
        }
      case 'bookmark':
        return <div>bookMark</div>;
      case 'personal':
        return <div>personal</div>;
    }
  }
  return <div></div>;
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const renderOverview = (currentInfo, props = {}) => {
  let { value, setValue } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { subtopic, text } = currentInfo || {};

  return (
    <ThemeProvider theme={theme}>
      <div>
        <p className="topic"> {text}</p>
        <p className="subTopic">{subtopic}</p>
      </div>

      {/* Detail tab and content */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          marginTop: '20px',
          paddingX: '10px',
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="Knowlwdge">
          <Tab label="Questions & Answers" {...a11yProps(0)} />
          <Tab label="Overview" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <QuestionsAnswers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Overview />
      </CustomTabPanel>
    </ThemeProvider>
  );
};
