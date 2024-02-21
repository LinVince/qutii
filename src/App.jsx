import React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import {MapView} from '@deck.gl/core';
import {TextLayer} from '@deck.gl/layers';
import {CollisionFilterExtension} from '@deck.gl/extensions';
import {scaleLinear} from 'd3-scale';
import {CSVLoader} from '@loaders.gl/csv';
import {load} from '@loaders.gl/core';
import Drawer from "./components/Drawer"
import Leftbar from "./components/Leftbar"

// Sample data
const DATA_URL =
  'https://raw.githubusercontent.com/LinVince/knowledge_map/main/final_data II.csv';

const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  zoom: 3.8,
  maxZoom: 16,
  minZoom: 1.4,
  pitch: 0,
  bearing: 0
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



export default function App({data, noOverlap = true, fontSize = 32}) {
  const [zoom, setZoom] = useState(INITIAL_VIEW_STATE.zoom);
  const [currentInfo, setCurrentInfo]=useState()
  const [drawerStatus, setDrawerStatus]=useState(false)

  
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
    let newLatitude = Math.min(Math.max(viewState.latitude, MIN_LATITUDE), MAX_LATITUDE);
    let newLongitude = Math.min(Math.max(viewState.longitude, MIN_LONGITUDE), MAX_LONGITUDE);
  
    // Return updated view state
    return {
      ...viewState,
      latitude: newLatitude,
      longitude: newLongitude
    };
  };

  const scale = 2 ** zoom;
  const sizeMaxPixels = (scale / 3) * fontSize;
  const sizeMinPixels = Math.min(scale / 1000, 0.5) * fontSize;

  const checkTopicColor = (type, text, ancestor = "", parent = "") => {
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
  }

  const checkFontSize = (type) => {
    switch (type){
      case 'macrotopic':
        return 64;
      case 'topic':
        return 24;
      case 'subtopic':
        return 16;
    }
  } 

  const textLayer = new TextLayer({
    id: 'knowledge_map',
    data,
    characterSet: 'auto',
    fontSettings: {
      buffer: 8
    },
    fontFamily: 'Raleway',
    fontWeight: 1000,

    // TextLayer options
    getText: d => d.text,
    getPosition: d => [d.longitude, d.latitude],
    getColor: d => checkTopicColor(d.type?.toLowerCase(),
                                   d.text?.toLowerCase(),
                                   d.ancestor?.toLowerCase(),
                                   d.parent?.toLowerCase()
                                  ),
    getSize: d => checkFontSize(d.type), //d.relevance/100,

    //sizeScale: fontSize,
    sizeMaxPixels,
    sizeMinPixels,
    maxWidth: 64 * 12,

    // CollideExtension options
    collisionEnabled: noOverlap,
    getCollisionPriority: d => d.relevance / 7,
    collisionTestProps: {
      //sizeScale: fontSize * 2,
      sizeMaxPixels: sizeMaxPixels * 2,
      sizeMinPixels: sizeMinPixels * 2
    },
    extensions: [new CollisionFilterExtension()],

    // Interaction
  
    interactive: true,
    pickable: true,
    onClick: info => {info.object.sizeScale = fontSize * 1.5; 
                      console.log('Clicked on:', info.object)
                      setCurrentInfo(info.object)
                      setDrawerStatus("overview")
                    },

  });

  return (
    <>
    <Leftbar setDrawerStatus={setDrawerStatus} drawerStatus={drawerStatus}/>
    
    {/* vision2 hidden */}
    <Drawer currentInfo={currentInfo}
     drawerStatus={drawerStatus}
     setDrawerStatus={setDrawerStatus} 
     />
    <DeckGL
      views={new MapView({repeat: false})}
      layers={[textLayer]}
      initialViewState={INITIAL_VIEW_STATE}
      onViewStateChange={onViewStateChange}
      controller={{touchRotate: true,dragRotate: true}}
      getCursor={() => "cursor"}
    >
    </DeckGL>
    
    </>
    
  );
}

export function renderToDOM(container) {
  const root = createRoot(container);
  root.render(<App />);

  load(DATA_URL, CSVLoader).then(data => {
    root.render(<App data={data} />);
  });
}