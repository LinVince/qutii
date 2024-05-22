import React, { useState, useMemo, useEffect } from 'react';
import { IconButton } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import { CollisionFilterExtension } from '@deck.gl/extensions';
import { Map } from 'react-map-gl';
import ZoomControls from '../components/ZoomControls';
import UserInfoModal from '../components/PopUpForm';
import TrendingTopicBtnOverlay from '../components/TrendingTopicBtnOverlay';
import Box from '@mui/material/Box';
import CustomSearch from '../components/CustomSearch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import nodes from '../data/nodes';
import textLayerColorScheme from '../data/textLayerColorScheme';
import colorConvert from '../services/colorConvert';

const mapStyle = 'mapbox://styles/vincejim/clptmnrul00co01r53737ar8c';
const mapboxAccessToken =
  'pk.eyJ1IjoidmluY2VqaW0iLCJhIjoiY2xvdnlzeGoyMTYzZDJxbHFjZTA2ejEzMyJ9.BSDmnQnGrI2VFa83kGl9QA';

const MAX_ZOOM = 16;
const MIN_ZOOM = 5;

const INITIAL_VIEW_STATE = {
  latitude: 0.7416668866832955,
  longitude: 0,
  zoom: 8.0,
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
  pitch: 0,
  bearing: 0,
  transitionDuration: 1000,
};

//const colorScale = scaleLinear()
// .domain([3, 4, 5, 6, 7])
// .range([
//    [29, 145, 192],
//    [65, 182, 196],
//    [127, 205, 187],
//    [199, 233, 180],
//    [237, 248, 177]
//  ]);

const noOverlap = true;
const fontSize = 32;

export default function Home() {
  return (
    <Sidebar>
      {/* the undefined is to prevent typescript error. The actual value will be populated by the sidebar wrapper */}
      <HomeContent
        showLeftbar={undefined}
        showMobileLeftbar={undefined}
        setShowLeftbar={undefined}
        setShowMobileLeftbar={undefined}
        setDrawerStatus={undefined}
        setCurrentInfo={undefined}
      />
    </Sidebar>
  );
}

export function HomeContent({
  showLeftbar,
  showMobileLeftbar,
  setShowLeftbar,
  setShowMobileLeftbar,
  setDrawerStatus,
  setCurrentInfo,
}) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const zoom = useMemo(() => INITIAL_VIEW_STATE.zoom, []);
  const [data, setData] = useState(null);
  const [cursorState, setCursorState] = useState('cursor');
  const [highlightState, setHighlightState] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(true);

  const changeViewState = topic => {
    const { longitude, latitude } = topic;
    setViewState({
      ...viewState,
      longitude,
      latitude,
      zoom: 12,
      transitionDuration: 1000,
    });
    setCurrentInfo(topic);
    setShowLeftbar(true);
    setDrawerStatus('overview');
  };

  /* 
  useEffect(() => {
    load(DATA_URL, CSVLoader).then(data => {
      setData(data);
    });
  }, []);
  */

  const handleSaveUserInfo = userInfo => {
    console.log('New User Information', userInfo);
  };

  const handleUserInfoModalClose = () => {
    setIsUserInfoModalOpen(false);
  };

  const onViewStateChange = ({ viewState }) => {
    // Define boundaries (latitude and longitude bounds)
    const MIN_LATITUDE = -80;
    const MAX_LATITUDE = 80;
    const MIN_LONGITUDE = -180;
    const MAX_LONGITUDE = 180;

    // Restrict latitude and longitude within bounds
    let newLatitude = Math.min(
      Math.max(viewState.latitude, MIN_LATITUDE),
      MAX_LATITUDE,
    );
    let newLongitude = Math.min(
      Math.max(viewState.longitude, MIN_LONGITUDE),
      MAX_LONGITUDE,
    );

    // Return updated view state
    return {
      ...viewState,
      latitude: newLatitude,
      longitude: newLongitude,
    };
  };

  const handleHover = info => {
    if (info.object && info.object.type === 'subtopic') {
      setCursorState('pointer');
      setHighlightState(true);
    } else {
      setCursorState('default');
      setHighlightState(false);
    }
  };

  const scale = 2 ** zoom;
  const sizeMaxPixels = (scale / 3) * fontSize;
  const sizeMinPixels = Math.min(scale / 1000, 0.5) * fontSize;

  const checkFontSize = type => {
    switch (type) {
      case 'macrotopic':
        return 70;
      case 'topic':
        return 24;
      case 'subtopic':
        return 20;
    }
  };

  const checkTopicColor = node => {
    if (node.type === 'macrotopic') {
      return textLayerColorScheme[node.text][node.type];
    } else {
      return textLayerColorScheme[node.macrotopic][node.type];
    }
  };

  const textLayer = new TextLayer({
    id: 'knowledge_map',
    data: nodes,
    characterSet: 'auto',
    fontSettings: {
      buffer: 8,
    },
    fontFamily: 'Gill Sans Extrabold, sans-serif',
    fontWeight: 'bold',

    // TextLayer options
    getText: d => d.text,
    getPosition: d => [d.longitude, d.latitude],
    getColor: d => checkTopicColor(d),
    getSize: d => checkFontSize(d.type), //d.relevance/100,

    //sizeScale: fontSize,
    sizeMaxPixels,
    sizeMinPixels,
    maxWidth: 64 * 12,

    // CollideExtension options
    collisionEnabled: noOverlap,
    getCollisionPriority: d => d.relevance,
    collisionTestProps: {
      sizeScale: 1,
      sizeMaxPixels: sizeMaxPixels * 10,
      sizeMinPixels: sizeMinPixels * 10,
    },
    extensions: [new CollisionFilterExtension()],

    // Interaction

    interactive: true,
    pickable: true,
    autoHighlight: highlightState,
    highlightColor: [255, 255, 255, 80],
    onClick: info => {
      info.object.sizeScale = fontSize * 1.5;
      const { type } = info.object;
      if (type === 'subtopic') {
        changeViewState(info.object);
        setCurrentInfo(info.object);
        setDrawerStatus('overview');
      }
    },
    onHover: info => {
      handleHover(info);
    },
  });

  const handleZoomIn = () => {
    if (viewState.zoom > MIN_ZOOM) {
      setViewState({
        ...viewState,
        zoom: viewState.zoom + 0.5,
        longitude: viewState.longitude + 0.005,
      });
    }
  };
  const handleZoomOut = () => {
    if (viewState.zoom < MAX_ZOOM) {
      setViewState({
        ...viewState,
        zoom: viewState.zoom - 0.5,
        longitude: viewState.longitude - 0.005,
      });
    }
  };

  const trendingTopics = [
    {
      text: 'Bike-sharing Programs',
      longitude: 12.804664164345917,
      latitude: 0.8099143979404076,
    },
    {
      text: 'Smart Sensors Deployment',
      longitude: 7.71916201496219,
      latitude: -0.5790708188243794,
    },
    {
      text: 'Autonomous Ride-Sharing Services',
      longitude: 9.650054037881015,
      latitude: -0.3644473979849971,
    },
    {
      text: 'Civic Engagement Platforms',
      longitude: -1.856901634160792,
      latitude: -2.2067030427223826,
    },
  ];

  const theme = useTheme();
  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box className="container">
      <Box
        sx={{
          position: 'relative',
          top: '23px',
          left: showLeftbar ? 100 : 10,
          zIndex: 3,
          display: isMediumScreenUp ? 'flex' : '',
          pr: '20px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{ minWidth: 300 }}
          onClick={() => {
            setShowLeftbar(true);
            setDrawerStatus('overview');
          }}
        >
          <CustomSearch params={{ autoFocus: false }} position="before">
            {isMediumScreenUp ? (
              ''
            ) : (
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setShowMobileLeftbar(!showMobileLeftbar);
                }}
                type="button"
                aria-label="search"
              >
                <MenuIcon sx={{ color: '#4B7D94' }} />
              </IconButton>
            )}
          </CustomSearch>
        </Box>

        <Box
          className="subtopic-container"
          sx={{
            ml: isMediumScreenUp ? 2 : 0,
            mt: isMediumScreenUp ? 0 : 2,
            overflow: 'scroll',
            position: 'relative',
          }}
        >
          <TrendingTopicBtnOverlay
            topics={trendingTopics}
            changeViewState={changeViewState}
          />
        </Box>
      </Box>

      {/* vision2 hidden */}

      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      <DeckGL
        views={new MapView({ repeat: false })}
        layers={[textLayer]}
        initialViewState={viewState}
        onViewStateChange={onViewStateChange}
        controller={{ touchRotate: true, dragRotate: true }}
        getCursor={() => cursorState}
      >
        <UserInfoModal
          isOpen={isUserInfoModalOpen}
          onRequestClose={handleUserInfoModalClose}
          onSave={handleSaveUserInfo}
        />
        <Map
          mapboxAccessToken={mapboxAccessToken}
          mapStyle={mapStyle}
          initialViewState={viewState}
        />
      </DeckGL>
    </Box>
  );
}
