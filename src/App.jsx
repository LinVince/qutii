import { ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import { CollisionFilterExtension } from '@deck.gl/extensions';
import { CSVLoader } from '@loaders.gl/csv';
import { load } from '@loaders.gl/core';
import Drawer from './components/Drawer';
import Leftbar from './components/Leftbar';
import ZoomControls from './components/ZoomControls';
import UserInfoModal from './components/PopUpForm';
import { theme } from '../theme';
import KnowledgeSearch from './components/Search';
import TrendingTopicBtnOverlay from './components/TrendingTopicBtnOverlay';
import Box from '@mui/material/Box';

// Sample datcoa
const DATA_URL =
  'https://raw.githubusercontent.com/LinVince/knowledge_map/main/final_data II.csv';

const mapStyle = 'mapbox://styles/vincejim/clptmnrul00co01r53737ar8c';
const mapboxAccessToken =
  'pk.eyJ1IjoidmluY2VqaW0iLCJhIjoiY2xvdnlzeGoyMTYzZDJxbHFjZTA2ejEzMyJ9.BSDmnQnGrI2VFa83kGl9QA';


const MAX_ZOOM = 16;
const MIN_ZOOM = 1.4;

const INITIAL_VIEW_STATE = {
  latitude: 0.7416668866832955,
  longitude: 0,
  zoom: 8.0,
  maxZoom: 16,
  minZoom: 1.4,
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

export default function App() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [data, setData] = useState(null);
  const [zoom] = useState(INITIAL_VIEW_STATE.zoom);
  const [currentInfo, setCurrentInfo] = useState();
  const [drawerStatus, setDrawerStatus] = useState('');
  const [cursorState, setCursorState] = useState('cursor');
  const [highlightState, setHighlightState] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(true);
  const [newUserInfo, setNewUserInfo] = useState(null);

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
    setDrawerStatus('overview');
  };

  useEffect(() => {
    load(DATA_URL, CSVLoader).then(data => {
      setData(data);
    });
  });

  const handleSaveUserInfo = userInfo => {
    console.log('New User Information', userInfo);
    setNewUserInfo(userInfo);
  };

  const handleUserInfoModalClose = () => {
    setIsUserInfoModalOpen(false);
  };

  //const onViewStateChange = useCallback(({viewState}) => {
  //  setZoom(viewState.zoom);
  //}, []);

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

  const checkTopicColor = (type, text, ancestor = '', parent = '') => {
    switch (type) {
      case 'macrotopic':
        if (text === 'smart city') {
          return [31, 131, 105, 255];
        }
        break;
      case 'topic':
        if (parent === 'smart city') {
          return [64, 161, 137, 255];
        }
        break;
      case 'subtopic':
        if (ancestor === 'smart city') {
          return [160, 233, 214, 255];
        }
        break;
      default:
        return [31, 131, 105]; // Default color
    }
  };

  const checkFontSize = type => {
    switch (type) {
      case 'macrotopic':
        return 64;
      case 'topic':
        return 24;
      case 'subtopic':
        return 20;
    }
  };
  const textLayer = new TextLayer({
    id: 'knowledge_map',
    data,
    characterSet: 'auto',
    fontSettings: {
      buffer: 8,
    },
    fontFamily: 'Gill Sans Extrabold, sans-serif',
    fontWeight: 'bold',

    // TextLayer options
    getText: d => d.text,
    getPosition: d => [d.longitude, d.latitude],
    getColor: d =>
      checkTopicColor(
        d.type?.toLowerCase(),
        d.text?.toLowerCase(),
        d.ancestor?.toLowerCase(),
        d.parent?.toLowerCase(),
      ),
    getSize: d => checkFontSize(d.type), //d.relevance/100,

    //sizeScale: fontSize,
    sizeMaxPixels,
    sizeMinPixels,
    maxWidth: 64 * 12,

    // CollideExtension options
    collisionEnabled: noOverlap,
    getCollisionPriority: d => d.relevance,
    collisionTestProps: {
      sizeScale: 2.2,
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
      }
      setCurrentInfo(info.object);
      setDrawerStatus('overview');
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
      text: 'Bike-Sharing Programs',
      longitude: 1.2399802138999396,
      latitude: 0.6515189520088266,
    },
    {
      text: 'Smart Sensors Deployment',
      longitude: 0.07449049761842429,
      latitude: -3.909913109390505,
    },
    {
      text: 'Autonomous Ride-Sharing Services',
      longitude: 1.1668372857182283,
      latitude: 0.9731473931772844,
    },
    {
      text: 'Civic Engagement Platforms',
      longitude: -1.856901634160792,
      latitude: -2.2067030427223826,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Leftbar setDrawerStatus={setDrawerStatus} drawerStatus={drawerStatus} />

      {/* vision2 hidden */}
      <Drawer
        currentInfo={currentInfo}
        drawerStatus={drawerStatus}
        setDrawerStatus={setDrawerStatus}
      />
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      <Box
        sx={{
          position: 'absolute',
          top: '30px',
          left: '10%',
          zIndex: 3,
          display: 'flex',
        }}
      >
        <KnowledgeSearch />
        <Box sx={{ml: 2}}>
          <TrendingTopicBtnOverlay
          topics={trendingTopics}
          changeViewState={changeViewState}
        />
        </Box>
      </Box>

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
      </DeckGL>
    </ThemeProvider>
  );
}

export function renderToDOM(container) {
  const root = createRoot(container);
  root.render(<App />);

  load(DATA_URL, CSVLoader).then(data => {
    root.render(<App data={data} />);
  });
}
