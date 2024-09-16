import React, { useEffect, useRef } from "react";

export default function GoogleMaps() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      const CONFIGURATION = {
        locations: [
          {
            title: "UTN - Facultad Regional Resistencia",
            address1: "C. French 414",
            address2: "H3506 Resistencia, Chaco, Argentina",
            coords: { lat: -27.45091546265948, lng: -58.97919835463105 },
            placeId: "ChIJ0-ALyPAMRZQREgmBdIwn-ck",
          },
        ],
        mapOptions: {
          center: { lat: -27.45091546265948, lng: -58.97919835463105 },
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoom: 14,
          zoomControl: true,
          maxZoom: 17,
        },
      };

      const map = new window.google.maps.Map(
        mapContainerRef.current,
        CONFIGURATION.mapOptions
      );

      new window.google.maps.Marker({
        position: CONFIGURATION.locations[0].coords,
        map,
        title: CONFIGURATION.locations[0].title,
      });
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={mapContainerRef}></div>
  );
}
