import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  db,
} from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Text, Center, Button, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ImageOverlay from "../components/ImageOverlay";
import CardListing from "../components/CardListing";
import apartmentData from "../fakeApartmentData";

function Landing() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      // Query to fetch listings where city is "irvine"
      const listingsQuery = query(
        collection(db, "listings"),
        where("city", "==", "irvine"),
        limit(4)
      );

      try {
        const querySnapshot = await getDocs(listingsQuery);
        const fetchedListings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(fetchedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      {/* Navigation bar */}
      <Navbar />
      {/* image overlay with search */}
      <ImageOverlay />

      {/* explore heading */}
      <Center marginTop={10} marginBottom={10}>
        <Text as="b" fontSize={30} fontFamily={"New Century Schoolbook"}>
          Explore Sublets
        </Text>
      </Center>

      {/* Cards Listings */}

      {/* get 4 cards and map it to CardListing component */}
      <Center>
        <Stack flexDirection={"row"} spacing={6}>
          {listings.map((element) => (
            <CardListing
              key={element.id}
              id={element.id}
              name={element.name}
              address={element.address}
              type={element.type}
              price={element.price}
              imageUrl={element.imageUrl}
            />
          ))}
        </Stack>
      </Center>

      <Center marginTop={10} marginBottom={10}>
        <Button
          size="md"
          borderLeftRadius={3.3}
          borderRightRadius={3.3}
          fontSize={20}
          onClick={() => navigate("/allListings/:selectedListing")}
        >
          See More
        </Button>
      </Center>
    </>
  );
}

export default Landing;
