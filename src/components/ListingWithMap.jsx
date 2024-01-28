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

function ListingWithMap({
  listings,
  showDeleteButton,
  setUserListings,
  selectedListingId = null,
}) {
  // console.log(selectedListingId);
  const [selectedElement, setElement] = useState(null);

  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const showClickedCard = (id) => {
    const foundElement = listings.find((element) => element.id === id);
    if (foundElement) {
      setElement(foundElement);
    }
  };

  useEffect(() => {
    if (selectedListingId) {
      showClickedCard(selectedListingId);
    }
  }, [selectedListingId, listings]);

  const [isLiked, setLiked] = useState(false);

  const handleLikeToggle = (id) => {
    listings.filter((element) => {
      if (element.id === id) {
        setLiked(!isLiked);
      }
    });
  };

  // Function to handle deleting a listing
  // Function to handle deleting a listing
  const handleDeleteListing = async (listingId) => {
    try {
      // Delete listing from Firestore
      const db = getFirestore();
      const listingDocRef = doc(db, "listings", listingId);
      await deleteDoc(listingDocRef);

      // Wait for the deletion to complete
      // Then update the state to remove the deleted listing
      setUserListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );

      // Reset selectedElement state to null
      setElement(null);

      // Close the modal
      onClose();

      console.log("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  // const showMap = (lat,long) =>

  // console.log(selectedElement);
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
              src={element.imageUrl}
              alt="Apartment"
              width={""}
            />

            <Stack>
              <CardBody>
                <Heading fontSize={"3xl"}>{element.name}</Heading>
                <Text fontSize={"lg"} color={"gray"} marginBottom={4}>
                  {element.address}
                  {/* {" " + element.city.charAt(0).toUpperCase() + element.city.slice(1)} */}
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  Price: ${element.price}
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  Description: {element.type}
                </Text>
                <Text fontSize={"lg"}>{element.description}</Text>
              </CardBody>

              <Center>
                <CardFooter>
                  <Button
                    marginRight={3}
                    onClick={() => {
                      setOverlay(<OverlayOne />);
                      onOpen();
                    }}
                    variant="solid"
                    colorScheme="teal"
                  >
                    Contact Lister
                  </Button>

                  {/* Conditionally render delete button */}
                  {showDeleteButton && (
                    <Button
                      marginRight={3}
                      onClick={() => handleDeleteListing(element.id)}
                      variant="solid"
                      colorScheme="red"
                    >
                      Delete Listing
                    </Button>
                  )}

                  <Modal isOpen={isOpen} onClose={onClose}>
                    {overlay}
                    <ModalContent>
                      <ModalHeader>Lister Info</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody alignItems={"center"}>
                        <Text>
                          email:{" "}
                          {selectedElement ? selectedElement.email : null}
                        </Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          variant="solid"
                          colorScheme="teal"
                          onClick={() =>
                            (window.location = "mailto:kaylason8263@gmail.com")
                          }
                        >
                          Contact Now
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  {/* <Mailto label="Contact Lister" mailto="kaylason8263@gmail.com"/> */}

                  {/* <Button marginLeft={3} onClick={() => handleLikeToggle(element.id)}>
                    <FontAwesomeIcon
                      icon={isLiked ? solidHeart : regularHeart}
                      color={isLiked ? "red" : "black"}
                    />
                  </Button> */}
                  <Button>
                    <HeartButton id={element.id} />
                  </Button>
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
        >
          <Image
            objectFit="cover"
            src={selectedElement.imageUrl}
            alt="Apartment"
            width="100%"
            height="425px"
          />
          <Heading marginTop={3} marginLeft={3} fontSize="6xl">
            {selectedElement.name}
            <Button marginLeft={5}>
              <HeartButton />
            </Button>
          </Heading>

          <Text marginLeft={3} marginBottom={3} fontSize="2xl">
            {selectedElement.address}
          </Text>

          <Card>
            <Heading marginLeft={3}>About This Sublet</Heading>

            <CardBody>
              <Text> Price: {selectedElement.price}</Text>
              <Text> Floor Plan: {selectedElement.floor_plan}</Text>
              <Text> Description: </Text>
              <Text> {selectedElement.description}</Text>
              <Text> Longitude: {selectedElement.longitude} </Text>
              <Text> Latitude: {selectedElement.latitude} </Text>
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

export default ListingWithMap;
