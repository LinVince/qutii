import * as React from 'react';
import { Map, AttributionControl } from 'react-map-gl';

const mapStyle = 'mapbox://styles/vincejim/clptmnrul00co01r53737ar8c';
const mapboxAccessToken =
  'pk.eyJ1IjoidmluY2VqaW0iLCJhIjoiY2xvdnlzeGoyMTYzZDJxbHFjZTA2ejEzMyJ9.BSDmnQnGrI2VFa83kGl9QA';

export default function HandleMap(viewState) {
  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      mapStyle={mapStyle}
      initialViewState={viewState}
    >
      <AttributionControl customAttribution="qutii.org" />
    </Map>
  );
}
