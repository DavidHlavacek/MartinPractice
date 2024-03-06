import { useState, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke } from "ol/style";

const useMap = (onPolygonDrawn, onClick, highlightedDistrict, mode) => {
  const [map, setMap] = useState(null);
  const [highlightLayer, setHighlightLayer] = useState(null);

  // Initialize map
  useEffect(() => {
    const initialMap = new Map({
      target: "map-container",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [2191288.22, 6261721.54],
        zoom: 7.5,
        projection: "EPSG:3857",
      }),
    });

    const highlightStyle = new Style({
      fill: new Fill({ color: "rgba(255, 255, 0, 0.5)" }),
      stroke: new Stroke({ color: "#ffcc33", width: 2 }),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: highlightStyle,
    });

    initialMap.addLayer(vectorLayer);
    setHighlightLayer(vectorLayer);
    setMap(initialMap);

    return () => initialMap.setTarget(undefined);
  }, []);

  // Handle draw and click interactions based on mode
  useEffect(() => {
    if (!map) return;

    map.getInteractions().clear();

    if (mode === "draw" && onPolygonDrawn) {
      const drawInteraction = new Draw({
        source: new VectorSource(),
        type: "Polygon",
      });

      drawInteraction.on("drawend", (event) => {
        const geometry = event.feature.getGeometry();
        const coordinates = geometry.getCoordinates()[0];
        onPolygonDrawn({ coordinates });
      });

      map.addInteraction(drawInteraction);
    }

    if (mode === "click" && onClick) {
      map.on("singleclick", (e) => {
        const coordinate = map.getCoordinateFromPixel(e.pixel);
        onClick(coordinate);
      });
    }
  }, [map, mode, onPolygonDrawn, onClick]);

  // Update highlight layer based on highlightedDistrict
  useEffect(() => {
    if (!map || !highlightLayer || !highlightedDistrict) return;

    const features = new GeoJSON().readFeatures(highlightedDistrict, {
      dataProjection: "EPSG:3857",
      featureProjection: "EPSG:3857",
    });

    highlightLayer.getSource().clear();
    highlightLayer.getSource().addFeatures(features);
  }, [map, highlightLayer, highlightedDistrict]);

  return { map, setMap, highlightLayer, setHighlightLayer };
};

export default useMap;
