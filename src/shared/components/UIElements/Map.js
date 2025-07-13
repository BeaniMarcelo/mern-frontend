import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';

import './Map.css';

const MapComponent = props => {
  const mapRef = useRef();
  const mapInstance = useRef();
  const markersSource = useRef();

  // Destructure props to avoid dependency issues
  const { center, zoom, onClick, markers, className, style } = props;

  useEffect(() => {
    if (!mapRef.current) return;

    // Create vector source for markers
    markersSource.current = new VectorSource();

    // Create vector layer for markers
    const markersLayer = new VectorLayer({
      source: markersSource.current,
      style: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ff0000'
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2
          })
        })
      })
    });

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        markersLayer
      ],
      view: new View({
        center: fromLonLat([center?.lng || -74.0060, center?.lat || 40.7128]),
        zoom: zoom || 13
      })
    });

    mapInstance.current = map;

    // Add click handler
    if (onClick) {
      map.on('click', (event) => {
        const coordinate = event.coordinate;
        const lonLat = toLonLat(coordinate);
        
        onClick({
          latLng: {
            lat: () => lonLat[1],
            lng: () => lonLat[0]
          }
        });
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
      }
    };
  }, [center, zoom, onClick]);

  // Update markers when markers prop changes
  useEffect(() => {
    if (!markersSource.current || !markers) return;

    markersSource.current.clear();

    markers.forEach(marker => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([marker.position.lng, marker.position.lat]))
      });
      markersSource.current.addFeature(feature);
    });
  }, [markers]);

  return (
    <div className={`map ${className || ''}`} style={style}>
      <div ref={mapRef} className="map-container" />
    </div>
  );
};

export default MapComponent;