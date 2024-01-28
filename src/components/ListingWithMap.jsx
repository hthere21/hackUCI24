import HeartButton from "./HeartButton";

import React from "react";
import { useState } from "react";
import apartmentData from "../fakeApartmentData";
import { Map, Marker } from "pigeon-maps";

import {
  Grid,
  SimpleGrid,
  Box,
  GridItem,
  Card,
  Image,
  Flex,
  Stack,
  CardBody,
  Heading,
  Text,
  Center,
  CardFooter,
  Button,
  AspectRatio,
} from "@chakra-ui/react";

function ListingWithMap({ listings }) {
  const [selectedElement, setElement] = useState(null);

  const showClickedCard = (id) => {
    listings.filter((element) => {
      if (element.id === id) {
        setElement(element);
      }
    });
  };

  // const showMap = (lat,long) =>

  // console.log(selectedElement);
  return (
    <SimpleGrid columns={2} spacing={2}>
      {/* All the card listings */}
      <Box w="100%" h="100vh">
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
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  {element.price}
                </Text>
                <Text fontSize={"lg"} marginBottom={1}>
                  {element.type}
                </Text>
                <Text fontSize={"lg"}>
                  Pet friendly, Non-smoking, Clean, Fitness Building
                </Text>
              </CardBody>

              <Center>
                <CardFooter>
                  <Button variant="solid" colorScheme="teal">
                    Contact Lister
                  </Button>

                  <Button marginLeft={3}>
                    <HeartButton />
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
          height={"100vh"}
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
            <Heading marginLeft={3}>About the Place</Heading>

            <CardBody>
              <Text> Price: {selectedElement.price}</Text>
              <Text> Floor Plan: {selectedElement.floor_plan}</Text>
              <Text> Description: </Text>
              <Text> Remember to change this to the description.</Text>
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
        <Box
          width="100%"
          height={"100vh"}
          margin={0}
          padding={0}
          backgroundColor={"#EAEAEA"}
        >
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
