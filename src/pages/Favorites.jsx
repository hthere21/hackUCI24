import React from "react";
import Navbar from "../components/Navbar";
import ListingWithMap from "../components/ListingWithMap";
import apartmentData from "../fakeApartmentData";

import {Heading, Center } from "@chakra-ui/react";

function Favorites() {
  return (
    <>
      <Navbar />

      <Center marginTop={5} marginBottom={5}>
        <Heading fontFamily={"New Century Schoolbook"} fontSize={40}>Favorites</Heading>
      </Center>

      <ListingWithMap listings={apartmentData} />
    </>
  );
}

export default Favorites;
