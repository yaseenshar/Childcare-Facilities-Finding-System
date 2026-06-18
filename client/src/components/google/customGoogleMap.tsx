import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import merkerBlue from "@/assets/icons/marker-blue.png";
import merkerBlack from "@/assets/icons/marker-black.png";
import merkerTeal from "@/assets/icons/marker-teal.png";
import merkerVoilet from "@/assets/icons/marker-violet.png";
import merkerRed from "@/assets/icons/marker-red.png";
import React from 'react';
import { Facilities } from '@/redux/reducers/facilitiesSlice';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

interface CustomMapProps {
  markedlocations: Facilities[];
  handleMarkerClick: (categoryId: string, facilityId: number) => void;
}

const CustomGoogleMap: React.FC<CustomMapProps> = ({ markedlocations, handleMarkerClick }) => {

  const { getMarkerIcons } = useMapHandlers();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD3DzosZzQeqihUrvmg8dOGoPKIX-I3z-c"
  })


  const MarkerPointers = () => {
    return (
      <>
        {markedlocations?.length > 0 && markedlocations?.map((facilityCategory) => {
          const markerIcon = getMarkerIcons(facilityCategory.name);
          return facilityCategory?.features && facilityCategory?.features?.map((facility) => {
            return (
              <Marker
                key={facility?.properties?.id} // Using index as key is not recommended in production
                position={{ lat: facility.geometry?.coordinates[1], lng: facility.geometry?.coordinates[0] }}
                icon={{
                  url: markerIcon,
                  scaledSize: new google.maps.Size(32, 32) // Size of the icon
                }}
                onClick={() => handleMarkerClick(facilityCategory?.id, facility?.properties?.id)}
              >
              </Marker>
            )
          })
        })}
      </>)
  }

  return (isLoaded ? (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: markedlocations[0]?.features[0]?.geometry?.coordinates[1], lng: markedlocations[0]?.features[0]?.geometry?.coordinates[0] }}
        zoom={12}
      >
        <MarkerPointers />
      </GoogleMap>
    </div>
  ) : <></>
  )
}

export default React.memo(CustomGoogleMap)

const useMapHandlers = () => {
  const getMarkerIcons = (categoryName: string) => {
    switch (categoryName) {
      case "Jugendberufshilfen":
        return merkerBlue;
      case "Schulsozialarbeit":
        return merkerRed;
      case "Kindertageseinrichtungen":
        return merkerTeal;
      case "Schulen":
        return merkerVoilet;
      default:
        return merkerBlack;
    }
  }

  return {
    getMarkerIcons
  }
}