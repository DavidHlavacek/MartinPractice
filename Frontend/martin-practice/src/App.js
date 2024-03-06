import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import useApi from "./services/api";
import parseAttractions from "./utils/parser";

const App = () => {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);
  const { error, fetchDistricts, fetchHistoricalData } = useApi(
    "http://localhost:3000/api"
  );

  useEffect(() => {
    if (error) {
      alert(error);
      setDistricts([]);
    }
  }, [error]);

  const handlePolygonDrawn = async ({ coordinates }) => {
    const data = await fetchDistricts(coordinates, "polygon");
    if (data && Array.isArray(data)) {
      setDistricts(data);
    }
  };

  const handleClick = async (coordinate) => {
    const data = await fetchDistricts(coordinate, "click");
    if (data && data.district && data.neighbors) {
      setHighlightedDistrict(data.district.geometry);

      setDistricts(data.neighbors);

      setDistrict(data.district.name);

      const historicalDataSample = await fetchHistoricalData(
        data.district.name
      );
      const attractionsList = parseAttractions(historicalDataSample);
      setHistoricalData(attractionsList);
    }
  };

  return (
    <div>
      <MapComponent
        onPolygonDrawn={handlePolygonDrawn}
        onClick={handleClick}
        highlightedDistrict={highlightedDistrict}
        districts={districts}
        district={district}
        historicalData={historicalData}
      />
    </div>
  );
};

export default App;
