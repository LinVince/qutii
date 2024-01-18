import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import "./index.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import KnowledgeSearch from "./components/Search";
import Overview from "./components/Overview";
import QuestionsAnswers from "./components/Questions&answer";

export default function Knowledge_Drawer(props) {
  const { currentInfo } = props
  const [value, setValue] = React.useState(0);
  const [state, setDrawerOpen] = React.useState(false);
  const toggleDrawer =
    (open) =>{
      setDrawerOpen(open);
    }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Box sx={{ p: 3 }}>
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
  useEffect(() => {
    if(!!Object.keys(props.currentInfo).length){
      toggleDrawer(true)
    }
  }, [props.currentInfo])
  return (
    <Box sx={{ borderBottom: 1, width: '412px' }}>
      <SwipeableDrawer
        open={state}
        onClose={()=>toggleDrawer(false)}
        onOpen={()=>toggleDrawer(true)}
      >
        {/* Search */}
          <KnowledgeSearch/>
        {/* Knowledge Topic*/}

        <p className='topic'> {currentInfo.text}</p>
        <p className='subTopic'>{currentInfo.subtopic}</p>

        {/* Detail tab and content */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop:"20px" }}>
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
       
      </SwipeableDrawer>
    </Box>

  )
}