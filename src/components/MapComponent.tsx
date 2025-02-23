import React from 'react';
import { Coordinate } from '@/utils/coordinates';

interface MapComponentProps {
  coordinates: Coordinate[];
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
  const generateGoogleMapsUrl = () => {
    if (!coordinates || coordinates.length === 0) {
      return '';
    }

    const origin = `${coordinates[0].lat},${coordinates[0].lng}`;
    let destination = `${coordinates[coordinates.length - 1].lat},${coordinates[coordinates.length - 1].lng}`;
    let waypoints = '';

    if (coordinates.length > 2) {
      waypoints = coordinates.slice(1, coordinates.length - 1)
        .map(coord => `${coord.lat},${coord.lng}`)
        .join('|');
    }

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

    if (waypoints) {
      url += `&waypoints=${waypoints}`;
    }

    url += '&travelmode=driving';

    return url;
  };

  const mapUrl = generateGoogleMapsUrl();

  return (
    <div>
      {mapUrl ? (
        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          View Route on Google Maps
        </a>
      ) : (
        <p>No coordinates to display.</p>
      )}
    </div>
  );
};

export default MapComponent;
