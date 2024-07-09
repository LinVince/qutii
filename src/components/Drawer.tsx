import React, { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import '../index.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overview from './Overview';
import QuestionsAnswers from './Questions&answer';
import { Autocomplete, IconButton } from '@mui/material';
import CustomSearch from './CustomSearch';
import CloseIcon from '@mui/icons-material/Close';

type DrawerType = {
  showLeftbar: boolean;
  currentInfo: any;
  drawerStatus: string;
  setCurrentInfo: (value: any) => void;
  setDrawerStatus: (value: string) => void;
};

export default function KnowledgeDrawer({
  showLeftbar,
  currentInfo,
  drawerStatus,
  setCurrentInfo,
  setDrawerStatus,
}: Readonly<DrawerType>) {
  const [value, setValue] = useState(0);

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
        sx={{
          '& .MuiDrawer-paper': {
            position: 'absolute',
            left: showLeftbar ? '86px' : '0px'
          }
        }}
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
                options={[]}
                sx={{ width: '100%', mx: '20px', mt: '2px' }}
                renderInput={params => (
                  <CustomSearch params={params} triggerSearch={setCurrentInfo}>
                    <IconButton aria-label="close-icon">
                      <CloseIcon
                        onClick={() => setDrawerStatus('')}
                        sx={{ color: '#4B7D94' }}
                      />
                    </IconButton>
                  </CustomSearch>
                )}
              />
            </Box>
          )}
          {renderDrawerContent(drawerStatus, currentInfo, StateProps)}
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
              Welcome to QuTii's knowledge map! Explore topics and subtopics,
              which are constantly expanding. Click on any topic to see relevant
              excerpts from verified sources.
            </Box>
          );
        }
      case 'bookmark':
        return (
          <Box sx={{ p: '20px' }}>
            Our upcoming premium Bookmark feature will enable you to efficiently
            organize your searches, quotes, and links of interest. Stay tuned!
          </Box>
        );
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
  let { nodelabel, qnasubtopicid } = currentInfo || {};

  return (
    <>
      <Typography style={{ fontSize: 20, margin: 20, fontWeight: 'bold' }}>
        {nodelabel}
      </Typography>

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
        <QuestionsAnswers subtopic={qnasubtopicid} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Overview />
      </CustomTabPanel>
    </>
  );
};
