import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";

function CardListing(props) {
  const { name, address, city, state, zipcode, type, price, imageUrl } = props;
  return (
    <>
      <Card maxW="sm" _hover={{ bg: "gray.200" }}>
        <CardBody>
          <Image
            src={imageUrl}
            alt="A random apartment for sale"
            borderRadius="lg"
            width={250}
            height={250}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
            <Text>
              {address}
              <br />
              {city}, {state} {zipcode}
              <br />
              {type} | {price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </>
  );
}

export default CardListing;
