import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import HeartButton from "./HeartButton";

import React from "react";
import { useState } from "react";
import apartmentData from "../fakeApartmentData";
import HeartButton from "./HeartButton";
import GoogleMapReact from 'google-map-react';

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
  AspectRatio,
} from "@chakra-ui/react";


function ListingWithMap() {
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
                    <HeartButton/>
                  </Button>
                </CardFooter>
              </Center>
            </Stack>
          </Card>
        ))}
      </GridItem>

      {/* Detailed Property */}
      {selectedElement ? (
        <GridItem w="100%" h="10">
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
              <HeartButton/>
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

          <AspectRatio ratio={16 / 9}>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6642.805457267031!2d-117.84769245296229!3d33.64672532470028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcde0e2592bf91%3A0x79fbc5d0b6dab7ec!2sUniversity%20of%20California%2C%20Irvine!5e0!3m2!1sen!2sus!4v1706416273132!5m2!1sen!2sus"
            ></iframe>
          </AspectRatio>
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
