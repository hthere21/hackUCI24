import HeartButton from "./HeartButton";

import React from "react";
import { useState } from "react";
import apartmentData from "../fakeApartmentData";
import { Map, Marker } from "pigeon-maps";

import {
  Grid,
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

  const baseMapUrl = "https://www.google.com/maps/";

  const showClickedCard = (id) => {
    listings.filter((element) => {
      if (element.id === id) {
        setElement(element);
      }
    });
  };

  // console.log(selectedElement);
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      {/* All the card listings */}
      <GridItem w="100%" h="10">
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
      </GridItem>

      {/* Detailed Property */}
      {selectedElement ? (
        <GridItem w="100%" h="10" backgroundColor={"#EAEAEA"}> 
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
            </CardBody>
          </Card>

          <Map height={500} defaultCenter={[selectedElement.longitude, selectedElement.latitude]} defaultZoom={11}>
            <Marker width={50} anchor={[selectedElement.longitude, selectedElement.latitude]} />
          </Map>
        </GridItem>
      ) : (
        <GridItem w="100%" h="10" backgroundColor={"#EAEAEA"}>
          {/* <Center> */}
          <Flex
            backgroundColor={"#EAEAEA"}
            backgroundPosition={"cover"}
            alignContent={"center"}
            flexDirection={"column"}
            height="100%"
          >
            <Heading fontSize={"4xl"}>
              {" "}
              Select a Listing For More Detail{" "}
            </Heading>
          </Flex>
          {/* </Center> */}
        </GridItem>
      )}
    </Grid>

    // {showClickedCard}
  );
}

export default ListingWithMap;
