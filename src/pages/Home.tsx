import React, { useState, useMemo, useEffect } from 'react';
import { IconButton } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Map, AttributionControl } from 'react-map-gl';
import ZoomControls from '../components/ZoomControls';
import TrendingTopicBtnOverlay from '../components/TrendingTopicBtnOverlay';
import Box from '@mui/material/Box';
import CustomSearch from '../components/CustomSearch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import textLayerColorScheme from '../data/textLayerColorScheme';
import HandleTextLayer from '../components/TextLayer';
import token from '../data/token';
import useHomeStatusStore from '../store';

//const { mapStyle, mapboxAccessToken } = token;

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
  const {
    homeStatus: { viewState, cursorState, highlightState },
    setViewState,
    setCursorState,
    setHighlightState,
  } = useHomeStatusStore(state => ({
    homeStatus: state.homeStatus,
    setViewState: state.setViewState,
    setCursorState: state.setCursorState,
    setHighlightState: state.setHighlightState,
  }));

  const zoom = viewState.zoom;

  const changeViewState = topic => {
    const { longitude, latitude } = topic;
    setViewState({
      ...viewState,
      longitude,
      latitude,
      zoom: 14,
      transitionDuration: 1000,
    });
    setCurrentInfo(topic);
    setShowLeftbar(true);
    setDrawerStatus('overview');
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
    setViewState({
      ...viewState,
      latitude: newLatitude,
      longitude: newLongitude,
    });
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

  const textLayer = HandleTextLayer(
    checkTopicColor,
    checkFontSize,
    zoom,
    highlightState,
    changeViewState,
    setCurrentInfo,
    setDrawerStatus,
    handleHover,
  );

  const handleZoomIn = () => {
    if (viewState.zoom >= viewState.minZoom) {
      setViewState({
        ...viewState,
        zoom: viewState.zoom + 0.5,
        longitude: viewState.longitude + 0.005,
        transitionDuration: 1000,
      });
    }
  };
  const handleZoomOut = () => {
    if (viewState.zoom <= viewState.maxZoom) {
      setViewState({
        ...viewState,
        zoom: viewState.zoom - 0.5,
        longitude: viewState.longitude - 0.005,
        transitionDuration: 1000,
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
  ];

  const theme = useTheme();
  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '23px',
          left: showLeftbar ? 100 : 10,
          zIndex: 3,
          display: isMediumScreenUp ? 'flex' : '',
          pr: '20px',
          overflow: 'hidden',
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

        <TrendingTopicBtnOverlay
          topics={trendingTopics}
          changeViewState={changeViewState}
        />
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
        {/*<Map
          mapboxAccessToken={mapboxAccessToken}
          mapStyle={mapStyle}
          initialViewState={viewState}
        >
          <AttributionControl customAttribution="" />
    </Map>*/}
      </DeckGL>
    </>
  );
}
