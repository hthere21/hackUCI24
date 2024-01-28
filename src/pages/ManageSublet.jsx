import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingWithMap from "../components/ListingWithMap";
import { Center, Heading, Button } from "@chakra-ui/react";
import { useAuth } from "../components/AuthContext";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc, // Correct import
} from "firebase/firestore";

function ManageSublet() {
  const { user } = useAuth();
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (user) {
        try {
          const db = getFirestore();
          const listingsCollection = collection(db, "listings");

          const q = query(listingsCollection, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const listingsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserListings(listingsData);

          // Log user listings to console
          console.log("User Listings:", listingsData);
        } catch (error) {
          console.error("Error fetching user's listings:", error);
        }
      }
    };

    fetchUserListings();
  }, [user]);

  const handleDeleteListing = async (listingId) => {
    try {
      // Delete listing from Firestore
      const db = getFirestore();
      const listingDocRef = doc(db, "listings", listingId);
      await deleteDoc(listingDocRef);

      // Remove listing from state
      setUserListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );

      console.log("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Center marginTop={5} marginBottom={5}>
        <Heading fontFamily={"New Century Schoolbook"} fontSize={40}>
          My Sublets
        </Heading>
      </Center>

      <ListingWithMap
        listings={userListings}
        setUserListings={setUserListings}
        showDeleteButton={true}
        renderListing={(listing) => (
          <div key={listing.id}>
            {/* Display listing information */}
            <p>{listing.name}</p>
            <p>{listing.address}</p>
            {/* Add a button to delete the listing */}
            <Button onClick={() => handleDeleteListing(listing.id)}>
              Delete Listing
            </Button>
          </div>
        )}
      />
    </>
  );
}

export default ManageSublet;
