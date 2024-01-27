import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import { FaUserAlt, FaLock } from "react-icons/fa";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { EmailLoginForm } from "./EmailLoginForm";


// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

 function CardLogin(){
    return (
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Login</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <EmailLoginForm/>
          </Box>
        </Stack>

        <Box>
            <GoogleLoginButton/>
          </Box>

        <Box>
          New to us?{" "}
          <Link color="teal.500" href="/signup">
            Sign Up
          </Link>
        </Box>
      </Flex>
    );
  };

export default CardLogin;
