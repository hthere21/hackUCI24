import React from "react";
import Navbar from "../components/Navbar";
import ListingWithMap from "../components/ListingWithMap";
import apartmentData from "../fakeApartmentData";
import { Center, Heading } from "@chakra-ui/react";

function ManageSublet() {
  return (
    <>
      <Navbar />
      <Center marginTop={5} marginBottom={5}>
        <Heading fontFamily={"New Century Schoolbook"} fontSize={40}>My Sublets</Heading>
      </Center>

      <ListingWithMap listings={apartmentData} />
    </>
  );
}

export default ManageSublet;
