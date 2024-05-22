import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import '../index.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Overview from './Overview';
import QuestionsAnswers from './Questions&answer';
import { Autocomplete, TextField } from '@mui/material';


type DrawerType = {
  currentInfo: any, 
  drawerStatus: string, 
  setDrawerStatus: (value: string) => void
}

type searchData  = {
  name: string;
  [key: string]: string | number | any
}

export default function KnowledgeDrawer({ currentInfo, drawerStatus, setDrawerStatus } : Readonly<DrawerType>) {
  const [value, setValue] = useState(0);
  const [searchList, setSearchList] = useState<searchData[]>([])
  const [searchInput, setSearchInput] = useState(searchList[0])
  const [topicInfo, setTopicInfo] = useState(currentInfo)

  const requestOptions = {
    method: "GET",
  };

  let timer: NodeJS.Timeout;

  const search = async (event) => {
    clearTimeout(timer);
    const searchValue = event.target.value

    // call the api with the query
    const url = `http://graphviz-network-lb-ff6880c917e535f1.elb.eu-west-2.amazonaws.com:8080/search/subtopic?q=${searchValue}`
    
    
    // setTimeout to debounce the api call
    timer = setTimeout(() => {
     fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        setSearchList(data);
      })
      .catch((error) => console.error(error));
    }, 500)
  }

  useEffect(() => {
    setTopicInfo(currentInfo);
    // clear the search box
    setSearchList([])
    setSearchInput([] as any)
  }, [currentInfo])

  const updateSearch = (value) => {
    setTopicInfo({...value, text: value.name})
  }

  const getOption = (option) => {
    return option.name || ''
  }

  let StateProps = {
    value: value,
    setValue: setValue,
  };

  return (
    <Box>
      <SwipeableDrawer
        open={!!drawerStatus}
        onClose={() => setDrawerStatus('')}
        onOpen={() => null}
        defaultValue={''}
      >
        {/* Knowledge Topic*/}
        <Box sx={{ paddingTop: '20px' }}>
          {drawerStatus === 'overview' && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <Autocomplete
                disablePortal
                freeSolo
                id="combo-box-demo"
                options={searchList}
                value={searchInput}
                onChange={(e, value) => updateSearch(value)}
                getOptionLabel={(option) => getOption(option)}
                sx={{ width: '100%', mx: '20px', mt: '2px' }}
                renderInput={params => (
                  <TextField {...params} onChange={search} label="Subtopic" />
                )}
              />
            </Box>
          )}
          {renderDrawerContent(drawerStatus, topicInfo, StateProps)}
        </Box>
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
            <Box sx={{ p: '20px' }}>
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

const renderOverview = (currentInfo, props) => {
  let { value, setValue } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { subtopic, text } = currentInfo || {};

  return (
    <>
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
          <Tab
            style={{ fontWeight: 'bold', color: value == 1 ? '#4B7D94' : '' }}
            label="Questions & Answers"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontWeight: 'bold', color: value == 0 ? '#4B7D94' : '' }}
            label="Overview"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <QuestionsAnswers subtopic={text} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Overview />
      </CustomTabPanel>
    </>
  );
};
