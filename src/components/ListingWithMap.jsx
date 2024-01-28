import React from "react";
import { useState } from "react";
import apartmentData from "../fakeApartmentData";
import {
  Grid,
  GridItem,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  Textarea,
  Center,
  CardFooter,
  Button,
} from "@chakra-ui/react";

function ListingWithMap() {
  const [selectedElement, setElement] = useState({});
  const showClickedCard = (id) => {
    apartmentData.filter((element) => {
      if (element.id === id) {
        setElement(element);
      }
      else {
        setElement(null);
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
                </CardFooter>
              </Center>
            </Stack>
          </Card>
        ))}
      </GridItem>

      {/* Detailed Property */}
      {(selectedElement) ? (
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
              </Heading>
      
              <Text marginLeft={3} marginBottom={3} fontSize="2xl"> 
                {selectedElement.address}
              </Text>
      
              <Card> 
                <Heading marginLeft={3}> 
                  About the Place
                </Heading>
      
                <CardBody> 
                  <Text> Price: {selectedElement.price}</Text>
                  <Text> Floor Plan: {selectedElement.floor_plan}</Text>
                  <Text> Description: </Text>
                  <Text> Remember to change this to the description.</Text>
                </CardBody>
              </Card>
      
            </GridItem>
            ) : (
              null
          )}
    </Grid>

    // {showClickedCard}
  );
}

export default ListingWithMap;
