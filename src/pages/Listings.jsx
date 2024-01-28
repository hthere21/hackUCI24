import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import ListingWithMap from "../components/ListingWithMap";
import {
  db,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
} from "../config/firebase";

function Listings() {
  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);

  // const city = searchParams.get("city");

  useEffect(() => {
    const fetchData = async () => {
      const filterParams = {
        city: searchParams.get("city"),
        type: searchParams.get("type"),
        price: searchParams.get("price"),
        start: searchParams.get("start"),
        end: searchParams.get("end"),
      };
      const fetchedItems = await fetchListings(filterParams);
      setListings(fetchedItems);
    };

    fetchData();
  }, [searchParams]);

  const fetchListings = async (filters) => {
    const allFiltersNull = Object.values(filters).every(
      (value) => value === null || value === ""
    );

    if (allFiltersNull) {
      console.log("no filters");
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
      }
    }

    try {
      const listingsRef = collection(db, "listings");
      let promises = [];

      // Create separate queries for each filter
      if (filters.city) {
        let filteredCity = filters.city.replace(/\W/g, "").toLowerCase();
        promises.push(
          getDocs(query(listingsRef, where("city", "==", filteredCity)))
        );
      }
      if (filters.type) {
        promises.push(
          getDocs(query(listingsRef, where("type", "==", filters.type)))
        );
      }
      if (filters.price) {
        promises.push(
          getDocs(
            query(listingsRef, where("price", "<=", Number(filters.price)))
          )
        );
      }
      if (filters.start) {
        let startDate = Timestamp.fromDate(new Date(filters.start));
        promises.push(
          getDocs(query(listingsRef, where("start", "<=", startDate)))
        );
      }
      if (filters.end) {
        let endDate = Timestamp.fromDate(new Date(filters.end));
        promises.push(getDocs(query(listingsRef, where("end", ">=", endDate))));
      }

      // Fetch and process the results of each query
      const allResults = await Promise.all(promises);
      // console.log("all results", allResults);

      let resultsForEachQuery = allResults.map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      // console.log("Results for each query:", resultsForEachQuery);

      // Check if there are no results from any query
      if (resultsForEachQuery.some((results) => results.length === 0)) {
        return []; // No intersection possible if any query returned no results
      }

      // Start with the first query's results as the initial intersection
      let intersection = resultsForEachQuery[0];

      // Find the intersection with the rest of the queries
      for (let i = 1; i < resultsForEachQuery.length; i++) {
        intersection = intersection.filter((item1) =>
          resultsForEachQuery[i].some((item2) => item2.id === item1.id)
        );
      }

      // console.log("Intersected listings:", intersection);
      return intersection;
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
