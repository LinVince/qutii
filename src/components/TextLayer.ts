import { TextLayer } from '@deck.gl/layers';
import nodes from '../data/nodes';
import { CollisionFilterExtension } from '@deck.gl/extensions';
import {useDataFetcher} from "../services/fetchData";

export default function HandleTextLayer (
  checkTopicColor,
  checkFontSize,
  zoom,
  highlightState,
  changeViewState,
  setCurrentInfo,
  setDrawerStatus,
  handleHover,
){
  
  const DATA_URL = "https://elb.qutii.org:443/library/libraryEntities";

  const result = useDataFetcher(DATA_URL); // Fetch data using the hook
  if (!result || !result.data) {
    return null; // or return some loading indicator
  }
  const {data} = result;
  
 
  const noOverlap = true;
  const fontSize = 32;
  const scale = 2**zoom;
  const sizeMaxPixels = (scale / 3) * fontSize;
  const sizeMinPixels = Math.min(scale / 1000, 0.5) * fontSize;

  return new TextLayer({
    id: 'knowledge_map',
    data,
    characterSet: 'auto',
    fontSettings: {
      buffer: 8,
    },
    fontFamily: 'Gill Sans Extrabold, sans-serif',
    fontWeight: 'bold',

    // TextLayer options
    getText: d => d.nodelabel,
    getPosition: d => [d.gephinodelongitude, d.gephinodelatitude],
    getColor: d => checkTopicColor(d),
    getSize: d => checkFontSize(d), 

    //sizeScale: fontSize,
    sizeMaxPixels,
    sizeMinPixels,
    maxWidth: 64 * 12,

    // CollideExtension options
    collisionEnabled: noOverlap,
    getCollisionPriority: null,
    collisionTestProps: {
      sizeScale: 3,
      sizeMaxPixels: sizeMaxPixels * 6,
      sizeMinPixels: sizeMinPixels * 6,
    },
    extensions: [new CollisionFilterExtension()],

    // Interaction

    interactive: true,
    pickable: true,
    autoHighlight: highlightState,
    highlightColor: [255, 255, 255, 80],
    onClick: info => {
      info.object.sizeScale = fontSize * 1.5;
      const { qnasubtopicid } = info.object;
      if (qnasubtopicid !== -1) {
        changeViewState(info.object);
        setCurrentInfo(info.object);
        setDrawerStatus('overview');
      }
    },
    onHover: info => {
      handleHover(info);
    },
  });
};

