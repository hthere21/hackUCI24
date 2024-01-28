import React from "react";
import { useState, useEffect } from "react";
import { key } from "../config/melissa";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

function MelissaTest() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // ---
  const [error, setError] = useState(null);

  function generateUrl() {
    const url = new URL(
        "https://address.melissadata.net/v3/WEB/GlobalAddress/doGlobalAddress"
      );
      url.search = new URLSearchParams({
        t: "zotLeaseRequest",
        id: key,
        a1: address,
        loc: city,
        admarea: state,
        postal: zip,
        ctry: "USA",
        format: "json",
      });
    return url;
}

const fetchData = async (requestURL) => {
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data retrieve success", data);
      return data;  // Return the data for immediate use
    } catch (error) {
      setError(error);
      return null;  // Return null in case of an error
    }
  };


    

  const handleSubmit = async () => {
        const result = await fetchData(generateUrl());
        console.log(result);
        console.log(result.Records[0].Latitude, result.Records[0].Longitude)
  };

  return (
    <>
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>City</FormLabel>
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Zip</FormLabel>
        <Input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>State</FormLabel>
        <Select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="" disabled>
            Select a state
          </option>
          {usStates.map((usState) => (
            <option key={usState} value={usState}>
              {usState}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default MelissaTest;
