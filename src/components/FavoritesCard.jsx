import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import HeartButton from "./HeartButton";
import Mailto from "./Mailto";

import { Map, Marker } from "pigeon-maps";

import {
  SimpleGrid,
  Box,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  Center,
  CardFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

import {
  getDoc,
  query,
  where,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  auth,
} from "../config/firebase";
import { useAuth } from "../components/AuthContext";

function FavoritesCard({ listings, showDeleteButton, setUserListings }) {
  const [selectedElement, setElement] = useState(null);

  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const showClickedCard = (id) => {
    listings.filter((element) => {
      if (element.id === id) {
        setElement(element);
      }
    });
  };

  const [isLiked, setLiked] = useState(false);

  const handleLikeToggle = (id) => {
    listings.filter((element) => {
      if (element.id === id) {
        setLiked(!isLiked);
      }
    });
  };

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

  const handleRemoveLiked = async (listingId) => {
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
    <SimpleGrid columns={2} spacing={2}>
      {/* All the card listings */}
      <Box w="100%" height="100vh" overflowY={"scroll"}>
        {listings.map((element) => (
          <Card
            key={element.id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            _hover={{ bg: "gray.200" }}
            onClick={() => showClickedCard(element.id)}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "250px" }}
              src={element?.imageUrl || "default-image-url"}
              alt={element?.name || "No Name"}
              width={""}
            />

            <Stack>
              <CardBody>
                <Heading fontSize={"3xl"}>{element.name}</Heading>
                <Text fontSize={"lg"} color={"gray"} marginBottom={4}>
                  {element.address}, {element?.city || "N/A"}
                  {/* {" " + element.city.charAt(0).toUpperCase() + element.city.slice(1)} */}
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  Price: ${element.price}
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  Type: {element?.type || "N/A"}
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  Dates:{" "}
                  {element?.start?.toDate().toLocaleDateString() || "N/A"} -{" "}
                  {element?.end?.toDate().toLocaleDateString() || "N/A"}
                </Text>

                <Text fontSize={"lg"}>
                  {element?.description || "No Description"}
                </Text>
              </CardBody>

              <Center>
                <CardFooter>
                  {/* Conditionally render delete button */}
                  {showDeleteButton && (
                    <Button
                      marginRight={3}
                      onClick={() => handleRemoveLiked(element.id)}
                      variant="solid"
                      colorScheme="red"
                    >
                      Remove Favorite
                    </Button>
                  )}
                </CardFooter>
              </Center>
            </Stack>
          </Card>
        ))}
      </Box>

      {/* Detailed Property */}
      {selectedElement ? (
        <Box
          width="100%"
          height="100vh"
          overflowY={"scroll"}
          margin={0}
          padding={0}
          backgroundColor={"#EAEAEA"}
          borderRadius={15}
        >
          <Image
            objectFit="cover"
            src={selectedElement.imageUrl}
            alt="Apartment"
            width="100%"
            height="425px"
          />
          <Heading marginTop={3} marginLeft={3} fontSize="5xl">
            {selectedElement.name}
          </Heading>

          <Text marginLeft={3} marginBottom={3} fontSize="2xl" color={"gray"}>
            {selectedElement.address}
          </Text>

          <Card>
            <Text marginLeft={3} as={"b"} fontSize={30} marginTop={4}>
              About This Sublet
            </Text>

            <CardBody>
              <Text fontSize={"lg"} marginBottom={1}>
                {" "}
                Price: {selectedElement.price}
              </Text>
              <Text fontSize={"lg"} marginBottom={1}>
                {" "}
                Floor Plan: {selectedElement.floor_plan}
              </Text>
              <Text fontSize={"lg"} marginBottom={1}>
                {" "}
                Description:{" "}
              </Text>
              <Text fontSize={"lg"} marginBottom={1}>
                {" "}
                {selectedElement.description}
              </Text>
              <Text fontSize={"lg"} marginBottom={1}>
                {" "}
                Longitude: {selectedElement.longitude}{" "}
              </Text>
              <Text fontSize={"lg"} marginBottom={1}>
                {" "}
                Latitude: {selectedElement.latitude}{" "}
              </Text>
            </CardBody>
          </Card>

          <Map
            height={500}
            center={[
              parseFloat(selectedElement.latitude),
              parseFloat(selectedElement.longitude),
            ]}
            defaultZoom={17}
          >
            <Marker
              width={50}
              anchor={[
                parseFloat(selectedElement.latitude),
                parseFloat(selectedElement.longitude),
              ]}
            />
          </Map>
        </Box>
      ) : (
        <Box width="100%" margin={0} padding={0} backgroundColor={"#EAEAEA"}>
          <Center>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "250px" }}
              marginTop={"30vh"}
              src="https://cdn-icons-png.flaticon.com/512/2879/2879307.png"
            />
          </Center>
          <Center>
            <Text fontSize={"4xl"} fontFamily={"Georgia"} marginTop={10}>
              {" "}
              Select a Listing For More Detail{" "}
            </Text>
          </Center>
        </Box>
      )}
    </SimpleGrid>

    // {showClickedCard}
  );
}

export default FavoritesCard;
