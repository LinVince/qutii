import React, { useEffect, useMemo } from 'react';
import { useState, useCallback, useContext } from 'react';
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
  const { currentInfo, drawerStatus, setDrawerStatus } = props

  const [state, setDrawerOpen] = React.useState(false);
  const toggleDrawer =
    (open) => {
      setDrawerOpen(open);
    }

  // Controls the opening and closing of the drawer via the currentInfo passed by the parent component.
  // useEffect(() => {

  //   if(currentInfo && !!Object.keys(currentInfo).length){
  //     setDrawerStatus("overview")
  //   }
  // }, [currentInfo])

  const [value, setValue] = useState(0);
  let StateProps={
    value:value,
    setValue:setValue,
  }
  return (
    <Box sx={{ borderBottom: 1, width: '412px' }}>
      <SwipeableDrawer
        open={!!drawerStatus}
        onClose={() => setDrawerStatus(false)}
        onOpen={() => toggleDrawer(true)}
        defaultValue={false}
      >
        {/* Search */}
        <KnowledgeSearch />
        {/* Knowledge Topic*/}
        {renderDrawerContent(drawerStatus, currentInfo, StateProps)}
      </SwipeableDrawer>
    </Box>

  )
}

function renderDrawerContent(drawerStatus, currentInfo,props) {
  if (drawerStatus) {
    switch (drawerStatus) {
      case "overview":
        if (currentInfo) {
          return renderOverview(currentInfo,props)
        } else {
          return (<div className="defaultValue">
            Welcome to QuTii Knowledge Map. Navigate the map and click on the topic you are interested in and relevant information will be displayed here.
          </div>)
        }
      case "bookmark":
        return <div>bookMark</div>
      case "personal":
        return <div>personal</div>
    }
  }
  return <div></div>
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

  const renderOverview = (currentInfo,props={}) => {
    let {value, setValue}=props;
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    let { subtopic, text } = currentInfo || {}

  return (<>
    <p className='topic'> {text}</p>
    <p className='subTopic'>{subtopic}</p>

    {/* Detail tab and content */}
    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: "20px" }}>
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
  </>)

}