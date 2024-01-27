// import { useState } from "react";
import React from "react";
import {Card, CardBody,Stack, Text, Divider, Heading} from "@chakra-ui/react";

function CardUser() {
    // const {firstName, lastName, gender, age, email} =
    // users;
  return (
    <>

      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Kayla Son</Heading>
            <Text>
              Female | 20
            </Text>
          </Stack>
        </CardBody>
        <Divider />
      </Card>

    </>
  );
}

export default CardUser;
