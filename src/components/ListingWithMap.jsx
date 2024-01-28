import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import HeartButton from './HeartButton'

import React from "react";
import { useState } from "react";
import apartmentData from "../fakeApartmentData";

// const heart = <FontAwesomeIcon icon={faHeart} />

// ReactDOM.render(heart, document.body)

import {
  Grid,
  GridItem,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  Center,
  CardFooter,
  Button
} from "@chakra-ui/react";


function ListingWithMap() {
  const [selectedElement, setElement] = useState(null);
  
  const showClickedCard = (id) => {
    apartmentData.filter((element) => {
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
        {apartmentData.map((element) => (
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
                  {element.floor_plan}
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
        </GridItem>
      ) : (
        <GridItem w="100%" h="10">
          <Center alignItems="center" justifyContent="center">
            <Heading> Select a Listing For More Detail </Heading>
          </Center>
        </GridItem>
      )}
    </Grid>

    // {showClickedCard}
  );
}

export default ListingWithMap;
