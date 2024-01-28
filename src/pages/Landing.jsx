import * as React from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { Text, Center, Button, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ImageOverlay from "../components/ImageOverlay";
import CardListing from "../components/CardListing";
import apartmentData from "../fakeApartmentData";

function Landing() {
  //   const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Navigation bar */}
      <Navbar />
      {/* image overlay with search */}
      <ImageOverlay />

      {/* explore heading */}
      <Center marginTop={10} marginBottom={10}>
        <Text as="b" fontSize={30} fontFamily={"New Century Schoolbook"}>
          Explore Sublets
        </Text>
      </Center>

      {/* Cards Listings */}

      {/* get 4 cards and map it to CardListing component */}
      <Center>
        <Stack flexDirection={"row"} spacing={6}>
          {apartmentData.map((element) => (
            <CardListing
              key={element.id}
              name={element.name}
              address={element.address}
              city={element.city}
              state={element.state}
              zipcode={element.zipcode}
              floor_plan={element.floor_plan}
              price={element.price}
              imageUrl={element.imageUrl}
            />
          ))}
        </Stack>
      </Center>

      <Center marginTop={10} marginBottom={10}>
        <Button
          size="md"
          borderLeftRadius={3.3}
          borderRightRadius={3.3}
          fontSize={20}
          onClick={() => navigate("/allListings")}
        >
          See More
        </Button>
      </Center>
    </>
  );
}

export default Landing;
