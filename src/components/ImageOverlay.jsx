import React from "react";
import { Container, Box, Center, Text, Stack } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";

function ImageOverlay() {
  return (
    <>
      <Container maxW={"-moz-max-content"} p={0}>
        <Box
          position="relative"
          h={80}
          bgImage="url('https://images.squarespace-cdn.com/content/v1/5b60d4fa70e802968763e7f5/1576788003994-PYV0Z6XT8J0L3BJUXTQF/ME_towers_082919_0036_sz-2.jpg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          left={0}
          right={0}
          width="100vw"
          maxWidth="100%"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            bg="black"
            opacity={0.5}
            bgBlendMode="multiply"
          />
          <Center
            position="relative"
            zIndex={1}
            textAlign="center"
            display="flex"
            justifyContent="center"
            minH={80}
          >
            <Stack>
              <Text as="b" fontSize="4xl" color={"white"}>
                Find Comfort In Your New Home
                <br />
                Helping students like you find their best stay.
              </Text>
              <br />
              <SearchBar />
            </Stack>
          </Center>
        </Box>
      </Container>
    </>
  );
}

export default ImageOverlay;
