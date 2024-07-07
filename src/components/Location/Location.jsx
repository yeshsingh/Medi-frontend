import React, { useEffect, useState } from "react";
import Map from "./Mapcomponent";
import { DNA,Vortex,FallingLines } from 'react-loader-spinner'
;
import axios from "axios";
const Location = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [demo, setDemo] = useState(false);
  const [getPlaceCordinates, setPlaceCordinates] = useState();
  const [showLocalityMap, setShowLocalityMap] = useState(false);

  const [showAppartmentMap, setShowAppartmentMap] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [localityAddress, setLocalityAddress] = useState('');
  const getLocation = async()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude );
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  function sayHello() {
    setDemo(true) ;
  }
  setTimeout(sayHello, 6000);
  const AddressLocation = async () => {
    const apiKey = "AIzaSyDz9QjCNiIHxRGhbb0NaEDOV0vm30Nc-A4"; // Replace with your Google Maps API key.

    // Define the API endpoint for reverse geocoding.
    const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=${getPlaceCordinates?.lat},${getPlaceCordinates?.lng}&key=${apiKey}";
    
    // Send a GET request to the API using Axios.
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Handle the response data.
    let formattedAddress;
    if (data.status === "OK" && data.results.length > 0) {
      formattedAddress = data.results[0].formatted_address;

    } else {
      console.error("Reverse geocoding failed");
    }

    let formadd = formattedAddress.replace(/,/g, "");
    setLocalityAddress(formadd)
  }
  const handleSaveLocation = async () => {

    try {
      await addLocality({
        "locality_name": locationName,
        "latitude": getPlaceCordinates?.lat,
        "longitude": getPlaceCordinates?.lng,
        // "radius": 5.0,
        "address": localityAddress

      }).then((resp) => {
        console.log(resp);
        setShowLocalityMap(false)
        getLocalities()
        setPlaceCordinates(null)
        setLocationName("")
        setLocalityAddress("")
        
      })

    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
      getLocation();
  });
    useEffect(() => {
    if (getPlaceCordinates) {
      AddressLocation()
    }
  },
    [getPlaceCordinates])


    return (
        <div style={{ display: 'flex' }}>
  <div style={{ flex: '1' }}>
    {
      latitude === 0 ? <></> : <Map
        lat={latitude}
        lng={longitude}
        setPlaceCordinates={setPlaceCordinates}
        width={700}
        height={600}
      />
    }
  
    {getPlaceCordinates && (
      <div>
        <p>latitude :{getPlaceCordinates?.lat}</p>
        <p>longitude :{getPlaceCordinates?.lng}</p>
        <p>Near By Location: {localityAddress}</p>
      </div>
    )}
  </div>
  <div className="col2" style={{ flex: '1' }}>
    {/* Content for the second column */}
    
    {
      demo === false ?<FallingLines
      color="#4388f9"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
      /> :
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 white:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Hospital
                </th>
                <th scope="col" class="px-6 py-3">
                    Docter
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Phone Number
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b white:bg-gray-800 white:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap white:text-white">
                Devshree Hospital
                </th>
                <td class="px-6 py-4">
                  Dr.Yesh Singh
                </td>
                <td class="px-6 py-4">
                    Jawar, Sehore
                </td>
                <td class="px-6 py-4">
                    939482943
                </td>
            </tr>
            <tr class="bg-white border-b white:bg-gray-800 white:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap white:text-white">
                Index Medical College Hospital & Research Centre
                </th>
                <td class="px-6 py-4">
                    Dr.Shrey Tiwari
                </td>
                <td class="px-6 py-4">
                Sehore Rak, Sehore
                </td>
                <td class="px-6 py-4">
                939482833
                </td>
            </tr>
            <tr class="bg-white white:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap white:text-white">
                   Agrawal hospital
                </th>
                <td class="px-6 py-4">
                    Dr P.N Agrawal
                </td>
                <td class="px-6 py-4">                 
                 kotri Rak, Sehore
                </td>
                <td class="px-6 py-4">
                    939487438
                </td>
            </tr>
        </tbody>
    </table>
</div>
}

  </div>
</div>

    );
};


export default Location;