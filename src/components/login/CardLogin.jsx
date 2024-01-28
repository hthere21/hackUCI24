import {
  Flex,
  Heading,
  Stack,
  Box,
  Avatar,
  Center,
  Container,
} from "@chakra-ui/react";

import { GoogleLoginButton } from "./GoogleLoginButton";
import { EmailLoginForm } from "./EmailLoginForm";

function CardLogin() {
  return (
    <Container maxW={"-moz-max-content"} p={0}>
      <Box
        position="relative"
        bgImage="url('https://png.pngtree.com/thumb_back/fh260/background/20230421/pngtree-apartment-building-interior-decoration-image_2333111.jpg')"
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
          <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar size={"lg"} />
              <Heading
                color="white"
                textShadow={
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                }
              >
                Login
              </Heading>
              <Box minW={{ base: "90%", md: "468px" }}>
                <EmailLoginForm />
              </Box>
            </Stack>

            <Box>
              <GoogleLoginButton />
            </Box>
          </Flex>
        </Center>
      </Box>
    </Container>
  );
}

export default CardLogin;
