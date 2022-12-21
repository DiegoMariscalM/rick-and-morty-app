import axios from "axios";
import React, { useEffect, useState } from "react";

const LocationFilter = ({ locationName, getNewLocation }) => {
  const [locationOptions, setlocationOptions] = useState();

  useEffect(() => {
    if (!locationName) return setlocationOptions();
    const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`;
    console.log(URL);
    axios
      .get(URL)
      .then((res) => setlocationOptions(res.data.results))
      .catch((err) => console.log(err));
  }, [locationName]);

  return (
    <ul className="search-info">
      {locationOptions?.map((locationOption) => (
        <li
          onClick={() =>
            getNewLocation(locationOption.url, locationOption.name)
          }
          key={locationOption.url}
        >
          {locationOption.name}
        </li>
      ))}
    </ul>
  );
};

export default LocationFilter;
