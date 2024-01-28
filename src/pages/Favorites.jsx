import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ListingWithMap from "../components/ListingWithMap";
import LoadingCard from "../components/login/LoadingCard";
import { Box, Button, Text, Heading, Center, Image } from "@chakra-ui/react";
import {
  doc,
  getDoc,
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from "../config/firebase";
import { useAuth } from "../components/AuthContext";

function Favorites() {
  const { user } = useAuth();
  const [userLikedArray, setUserLikedArray] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserLikedArray = async () => {
    if (user) {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const likedArray = userData.liked || [];

          // Fetch the actual listing IDs from the listings collection
          const listingsCollection = collection(db, "listings");
          const listingsQuery = query(listingsCollection);
          const listingsSnapshot = await getDocs(listingsQuery);
          const listingIds = listingsSnapshot.docs.map((doc) => doc.id);

          // Filter out any invalid IDs from userLikedArray
          const validLikedArray = likedArray.filter((id) =>
            listingIds.includes(id)
          );

          setUserLikedArray(validLikedArray);
        } else {
          console.warn("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user's liked items:", error);
      }
    }
  };

  const fetchListingsDetails = async () => {
    if (userLikedArray.length > 0) {
      const db = getFirestore();
      const listingsCollection = collection(db, "listings");

      const queries = userLikedArray.map((id) => doc(listingsCollection, id));

      try {
        const listingsSnapshot = await Promise.all(queries.map(getDoc));

        const listingsDetails = listingsSnapshot.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id }; // Add the id property
        });

        setFilteredApartments(listingsDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings details:", error);
      }
    }
  };

  const handleRemoveListing = async (listingId) => {
    console.log("Remove Clicked - listingId:", listingId);
    console.log("userLikedArray before removal:", userLikedArray);

    try {
      // Remove the listing from userLikedArray
      const updatedLikedArray = userLikedArray.filter((id) => id !== listingId);
      console.log("updatedLikedArray:", updatedLikedArray);
      setUserLikedArray(updatedLikedArray);

      // Remove the listing from filteredApartments
      setFilteredApartments((prevApartments) =>
        prevApartments.filter((listing) => listing.id !== listingId)
      );

      // Save the updated liked array to Firestore using updateDoc
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      // Update the Firestore document with the new liked array
      await updateDoc(userDocRef, { liked: updatedLikedArray });
      console.log("Update successful.");
    } catch (error) {
      console.error("Error removing listing:", error);
    }
  };

  useEffect(() => {
    fetchUserLikedArray();
  }, [user]);

  useEffect(() => {
    if (userLikedArray.length > 0) {
      fetchListingsDetails();
    }
  }, [userLikedArray]);

  useEffect(() => {
    console.log("User Liked Array:", userLikedArray); // Log here
  }, [userLikedArray]);

  useEffect(() => {
    console.log("Filtered Apartments:", filteredApartments); // Log here
  }, [filteredApartments]);

  return (
    <>
      <Navbar />

      <Center marginTop={5} marginBottom={5}>
        <Heading fontFamily={"New Century Schoolbook"} fontSize={40}>
          Favorites
        </Heading>
      </Center>

      {loading ? (
        <LoadingCard />
      ) : (
        <>
          {filteredApartments.map((listing) => (
            <Box key={listing.id} borderWidth="1px" borderRadius="lg" p="4">
              {/* Image */}
              <Image
                src={listing?.imageUrl || "default-image-url"} // Use the actual property name for the image URL
                alt={listing?.name || "No Name"}
                maxW="100%"
                h="auto"
              />

              <Heading fontSize="xl">{listing?.name || "No Name"}</Heading>
              <Text>{listing?.description || "No Description"}</Text>
              <Text>Price: ${listing?.price || "N/A"}</Text>

              {/* Additional fields */}
              <Text>Address: {listing?.address || "N/A"}</Text>
              <Text>City: {listing?.city || "N/A"}</Text>
              <Text>Type: {listing?.type || "N/A"}</Text>
              <Text>
                Start Date:{" "}
                {listing?.start?.toDate().toLocaleDateString() || "N/A"}
              </Text>
              <Text>
                End Date: {listing?.end?.toDate().toLocaleDateString() || "N/A"}
              </Text>

              {/* "X" button to remove listing */}
              <Button
                onClick={() => handleRemoveListing(listing.id)}
                mt={2}
                colorScheme="red"
              >
                Remove
              </Button>
            </Box>
          ))}
        </>
      )}
    </>
  );
}

export default Favorites;
