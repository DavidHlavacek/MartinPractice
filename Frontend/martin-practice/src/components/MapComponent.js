import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Assuming React Bootstrap for UI components
import DistrictsList from "./districtsList";
import HistoricalList from "./historicalList";
import useMap from "../hooks/useMap"; // Adjust the path according to your project structure

const MapComponent = ({
  onPolygonDrawn,
  onClick,
  highlightedDistrict,
  districts,
  district,
  historicalData,
}) => {
  const [mode, setMode] = useState("draw");
  useMap(
    onPolygonDrawn,
    mode === "click" ? onClick : null,
    highlightedDistrict,
    mode
  );

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "draw" ? "click" : "draw"));
  };

  return (
    <>
      <h1>
        {mode === "draw" ? "Draw a Polygon on the Map!" : "Click on the Map"}
      </h1>
      <div id="map-container" style={{ width: "100%", height: "500px" }}></div>
      <Button onClick={toggleMode} style={{ margin: "10px 0" }}>
        Switch to {mode === "draw" ? "Click" : "Draw"} Mode
      </Button>
      <div>
        {district && <h2>3 Historical Attractions in {district}</h2>}
        {!district && <h2>Districts:</h2>}
      </div>
      {historicalData && <HistoricalList historicalData={historicalData} />}
      {!historicalData && districts && <DistrictsList districts={districts} />}
    </>
  );
};

export default MapComponent;
