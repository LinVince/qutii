import React from "react";
import PropTypes from "prop-types";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  const handleZoomIn = () => {
    onZoomIn();
  };

  const handleZoomOut = () => {
    onZoomOut();
  };

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

ZoomControls.propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
};

export default ZoomControls;
