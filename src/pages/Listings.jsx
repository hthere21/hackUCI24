import * as React from "react";
import { useParams } from 'react-router-dom';
// import { Container, Box, Center, Text, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import ListingWithMap from "../components/ListingWithMap";

function Listings() {



  return (
    <>
      <Navbar />
      <FilterBar />
      <ListingWithMap />
    </>
  );
}

export default Listings;
