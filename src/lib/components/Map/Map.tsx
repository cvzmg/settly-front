// src/lib/components/Map/Map.tsx

"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, StyleFunction, Feature, GeoJsonObject } from "leaflet";
import { useState } from "react";

interface MapProps {
  geoJsonData: GeoJsonObject;
}

const Map = ({ geoJsonData }: MapProps) => {

  const [ highlightedAlcaldia, setHighlightedAlcaldia ] = useState<string | null>(null);
  const initialPosition: LatLngExpression = [19.43264250944936, -99.1332122122233];
  
  // FIX: Change "highlighFeature" to "highlightFeature"
  const highlightFeature = (e: any) => {
    const layer = e.target;
    const alcaldiaName = layer.feature.properties.nomgeo;
    setHighlightedAlcaldia(alcaldiaName);

    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.55
    });
  };

  const resetHighlight = (e: any) => {
    setHighlightedAlcaldia(null);
    const layer = e.target;
    style(layer.feature);
  };

  const onEachFeature = (feature: Feature, layer: any) => {
    if (feature.properties && feature.properties.nomgeo) {
      layer.bindTooltip(feature.properties.nomgeo, {
        permanent: false,
        direction: "center",
      });
    }

    layer.on({
      // This line is now correct because the function name above matches
      mouseover: highlightFeature,
      mouseout: (e: any) => {
        const geoJsonLayer = e.target;
        geoJsonLayer.setStyle(style(geoJsonLayer.feature));
      },
    });
  };

  const style: StyleFunction = (feature?: Feature) => {
    const isHighlighted =
      feature?.properties?.nomgeo === highlightedAlcaldia;

    if (isHighlighted) {
      return {
        fillColor: "#d0d9d5",
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.3,
      };
    }

    return {
        fillColor: "#d0d9d5",
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.3,
    };
  };

  return (
    <MapContainer
      center={initialPosition}
      zoom={10}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-screen w-screen"
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={style}
          onEachFeature={onEachFeature}
          key={highlightedAlcaldia} // Re-render when highlighted alcaldia changes
        />
      )}
    </MapContainer>
  );
};

export default Map;
