import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import ListingWithMap from "../components/ListingWithMap";
import { db, getDocs, collection, query, where } from "../config/firebase";

function Listings() {
  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  console.log(searchParamsObject);

  const city = searchParams.get("city");
  // console.log("City", city);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await fetchListings();
      setListings(fetchedItems);
    };

    fetchData();
  }, [city]);

  const fetchListings = async () => {
    try {
      let listingsQuery;

      if (city) {
        // Query listings based on the city parameter
        let filteredCity = city.replace(/\W/g, "").toLowerCase();
        listingsQuery = query(
          collection(db, "listings"),
          where("city", "==", filteredCity)
        );
      } else {
        // Query all listings if no city parameter is provided
        listingsQuery = query(collection(db, "listings"));
      }

      const queryResults = await getDocs(listingsQuery);
      const items = queryResults.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return (
    <>
      <Navbar />
      <FilterBar searchParameters={{ searchParamsObject }} />
      <ListingWithMap listings={listings} />
    </>
  );
}

export default Listings;
