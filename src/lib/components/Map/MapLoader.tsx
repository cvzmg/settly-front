"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { GeoJsonObject } from "leaflet";

// Define the props that this component will accept
interface MapLoaderProps {
  geoJsonData: GeoJsonObject;
}

const MapLoader = ({ geoJsonData }: MapLoaderProps) => {
  // Move the useMemo and dynamic import logic from page.tsx into this client component
  const DynamicMap = useMemo(
    () =>
      dynamic(() => import("@/lib/components/Map/Map"), {
        loading: () => <p className="text-center text-lg">Loading map...</p>,
        ssr: false, // This is now allowed because we are in a Client Component
      }),
    []
  );

  return <DynamicMap geoJsonData={geoJsonData} />;
};

export default MapLoader;
