import React from "react";
import Navbar from "../components/Navbar";
import ListingWithMap from "../components/ListingWithMap";
import apartmentData from "../fakeApartmentData";

import { Box, Button, Flex, Heading, Spacer, Center } from "@chakra-ui/react";

function Favorites() {
  return (
    <>
      <Navbar />

      <Center marginTop={5} marginBottom={5}>
        <Heading>Favorites</Heading>
      </Center>

            <ListingWithMap listings={apartmentData}/>
        </>
    );
}

export default Favorites;
