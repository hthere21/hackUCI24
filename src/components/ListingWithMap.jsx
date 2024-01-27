import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

function ListingWithMap() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <GridItem w="100%" h="10" bg="tomato" />
      <GridItem w="100%" h="10" bg="papayawhip" />
    </Grid>
  );
}

export default ListingWithMap;
