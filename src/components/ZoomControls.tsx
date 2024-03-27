import React from "react";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

type ZoomControlsType = {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls = ({ onZoomIn, onZoomOut }: ZoomControlsType) => {
  const handleZoomIn = () => onZoomIn();

  const handleZoomOut = () => onZoomOut();

  return (
    <div className="zoom-controls">
      <button className="zoom-button" onClick={handleZoomIn}>
        <ZoomInIcon fontSize="large" />
      </button>
      <button className="zoom-button" onClick={handleZoomOut}>
        <ZoomOutIcon fontSize="large" />
      </button>
    </div>
  );
};

export default ZoomControls;
