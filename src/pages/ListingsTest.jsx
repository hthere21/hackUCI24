import React from "react";
import { useEffect, useState } from "react";
import {
  Center,
  Stack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
// import FilterBar from "../components/FilterBar";
import CardListing from "../components/CardListing";
import { db, collection, getDocs, query } from "../config/firebase";

function ListingsTest() {
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
      {/* <FilterBar /> */}

      <Center>
        <Stack flexDirection={"row"} spacing={6}>
          {listings.map((element) => (
            <CardListing
              key={element.id}
              name={element.name}
              address={element.address}
              city={element.city}
              state={element.state}
              zipcode={element.zip}
              type={element.type}
              price={element.price}
              imageUrl={element.imageUrl}
            />
          ))}
        </Stack>
      </Center>
    </>
  );
}

export default ListingsTest;
