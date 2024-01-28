import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Container, Box, Center, Text, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import ListingWithMap from "../components/ListingWithMap";
import { db, getDocs, collection, query } from "../config/firebase";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await fetchListings();
      setListings(fetchedItems);
      // console.log(listings);
    };

    fetchData();
  }, []);

  const fetchListings = async () => {
    try {
      const queryResults = await getDocs(query(collection(db, "listings")));
      const items = queryResults.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(items);
      return items;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return (
    <>
      <Navbar />
      <FilterBar />
      <ListingWithMap listings={listings} />
    </>
  );
}

export default Listings;
