// src/lib/components/Map/Map.tsx
"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import Leaflet types
import {
  LatLngExpression,
  StyleFunction,
  LeafletMouseEvent,
  Layer,
} from "leaflet";

// Import GeoJSON types from 'geojson'
import { Feature, GeoJsonObject } from "geojson";

import { useState } from "react";

interface MapProps {
  geoJsonData: GeoJsonObject;
}

const Map = ({ geoJsonData }: MapProps) => {
  const [highlightedAlcaldia, setHighlightedAlcaldia] = useState<string | null>(
    null
  );

  const initialPosition: LatLngExpression = [
    19.43264250944936,
    -99.1332122122233,
  ];
  
  // Style function
  const style: StyleFunction = (feature?: Feature) => {
    const isHighlighted =
      feature?.properties?.nomgeo === highlightedAlcaldia;

    return {
      fillColor: "#d0d9d5",
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: isHighlighted ? 0.55 : 0.3,
    };
  };

  // Highlight feature
  const highlightFeature = (e: LeafletMouseEvent) => {
    const layer = e.target;
    const alcaldiaName = layer.feature.properties.nomgeo;

    setHighlightedAlcaldia(alcaldiaName);

    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.55,
    });
  };

  // Reset highlight
  const resetHighlight = (e: LeafletMouseEvent) => {
    setHighlightedAlcaldia(null);
    const layer = e.target;

    // Reset the layer style by calling the original style function
    layer.setStyle(style(layer.feature));
  };

  // Define behavior for each feature
  const onEachFeature = (feature: Feature, layer: Layer) => {
    if (feature.properties && feature.properties.nomgeo) {
      layer.bindTooltip(feature.properties.nomgeo, {
        permanent: false,
        direction: "center",
      });
    }

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
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
        />
      )}
    </MapContainer>
  );
};

export default Map;
