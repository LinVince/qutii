import React, { useContext } from 'react';
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
import Sidebar, { SidebarContext } from '../components/Sidebar';
import HandleTextLayer from '../components/TextLayer';
import useHomeStatusStore from '../store';
import colors from '../data/colorCode';
import trendingTopics from '../data/trendingTopics';

export default function Home() {
  return (
    <Sidebar>
      <HomeContent />
    </Sidebar>
  );
}

export function HomeContent() {
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

  const { showLeftbar, setShowLeftbar, setDrawerStatus, setCurrentInfo } =
    useContext(SidebarContext);

  const zoom = viewState.zoom;

  const changeViewState = topic => {
    const { gephinodelongitude, gephinodelatitude } = topic;
    setViewState({
      ...viewState,
      longitude: gephinodelongitude,
      latitude: gephinodelatitude,
      zoom: 8,
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
    if (info.object && info.object.qnasubtopicid !== -1) {
      setCursorState('pointer');
      setHighlightState(true);
    } else {
      setCursorState('default');
      setHighlightState(false);
    }
  };

  const checkFontSize = node => {
    if (node.macrotopicid !== -1) {
      return 40;
    } else if (node.topicid !== -1) {
      return 24;
    } else if (node.qnasubtopicid !== -1) {
      return 20;
    } else {
      return undefined;
    }
  };

  const checkTopicColor = node => colors[node.colorid]['rgb'];

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

  const theme = useTheme();
  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Box
        sx={{
          position: 'relative', //avoid layout issue with deck.gl
          top: '23px',
          left: showLeftbar ? 100 : 10,
          zIndex: 3,
          display: isMediumScreenUp ? 'flex' : '',
          pr: '20px',
        }}
      >
        <Box sx={{ minWidth: 300, position: 'relative' }}>
          <CustomSearch
            params={{ autoFocus: false }}
            position="before"
            triggerSearch={setCurrentInfo}
            setShowLeftbar={setShowLeftbar}
            setDrawerStatus={setDrawerStatus}
          >
            {isMediumScreenUp ? (
              ''
            ) : (
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setShowLeftbar(!showLeftbar);
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
            overflow: 'hidden',
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
