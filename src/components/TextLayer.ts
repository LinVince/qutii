import { TextLayer } from '@deck.gl/layers';
import nodes from '../data/nodes';
import { CollisionFilterExtension } from '@deck.gl/extensions';

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
  const noOverlap = true;
  const fontSize = 32;
  const scale = 2**zoom;
  const sizeMaxPixels = (scale / 3) * fontSize;
  const sizeMinPixels = Math.min(scale / 1000, 0.5) * fontSize;

  return new TextLayer({
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
    getCollisionPriority: d => d.relevance/100,
    collisionTestProps: {
      sizeScale: 3,
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
};

