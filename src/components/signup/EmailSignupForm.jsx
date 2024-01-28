import React, { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "../../config/firebase";

import {
  Input,
  Button,
  Text,
  Link,
  Center,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  FormControl,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const EmailSignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);

  const toast = useToast();

  const handleSignUpWithEmail = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      toast({
        title: "Signup Successful",
        description: "debug use only",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      // add user to db
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          liked: [],
          listings: [],
        });
        console.log("added user to DB");
      } catch (err) {
        console.log("Add user to db error: ");
        console.error(err);
      }

      navigate("/home");
    } catch (err) {
      console.error(err);

      let errorMessage = "An unknown error occurred.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should at least be 6 characters.";
      }

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <form>
      <Stack
        spacing={4}
        p="1.5rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        borderRadius={15}
      >
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt color="gray.300" />}
            />
            <Input
              type="email"
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<CFaLock color="gray.300" />}
            />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          borderRadius={10}
          variant="solid"
          colorScheme="teal"
          width="full"
          onClick={handleSignUpWithEmail}
        >
          Sign Up
        </Button>
        <Center>
          <Stack flexDirection={"row"} spacing={6}>
            <Text>Already have an account?</Text>
            <Link color="blue.500" href="/login">
              Log in
            </Link>
          </Stack>
        </Center>
      </Stack>
    </form>
  );
};
