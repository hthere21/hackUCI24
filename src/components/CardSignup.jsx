// import { useState } from "react";
import {
  Flex,
  Heading,
  Stack,
  Box,
  Avatar,
} from "@chakra-ui/react";

// import { FaUserAlt, FaLock } from "react-icons/fa";
// import { GoogleLoginButton } from "./GoogleLoginButton";
import { EmailSignupForm } from "./EmailSignupForm";
import { SignoutButton } from "./SignoutButton";

// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

const CardSignup = () => {
  // const [showPassword, setShowPassword] = useState(false);

  // const handleShowClick = () => setShowPassword(!showPassword);

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
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <EmailSignupForm />
        </Box>
        <SignoutButton />
      </Stack>
    </Flex>
  );
};

export default CardSignup;
