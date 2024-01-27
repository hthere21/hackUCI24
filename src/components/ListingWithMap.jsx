import React from "react";
import {
  Grid,
  GridItem,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";

function ListingWithMap() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <GridItem w="100%" h="10">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">Broadway</Heading>
              <Text color={"gray"}>333 Silly Ave</Text>
              <Text>$200 - $500</Text>
              <Text>Apartment</Text>
              <Text>Pet friendly, Non-smoking, Clean, Fitness Building</Text>
              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Contact Lister
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </GridItem>

      <GridItem w="100%" h="10" bg="papayawhip" />
    </Grid>
  );
}

export default ListingWithMap;
