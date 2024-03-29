import React, { useEffect, useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../config/firebase";
// Import necessary Firestore functions
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Center,
  Link,
  Text,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const EmailLoginForm = () => {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);

  const toast = useToast();

  const handleSignInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      updateUser(auth.currentUser);
      // Check if the user exists in Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // User doesn't exist in Firestore, prompt them to fill out a form
        navigate("/additional-info");
      } else {
        // User exists, proceed to the home page
        toast({
          title: "Login Successful",
          description: "debug use only",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        navigate("/home");
      }
    } catch (err) {
      console.error(err);

      let errorMessage = "An unknown error occurred.";

      if (err.code === "auth/invalid-credential") {
        errorMessage = "This email is invalid.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "The password is incorrect.";
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log("Email, password ", email, password);
  }, [email, password]);

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

          <FormHelperText textAlign="right">
            <Link>forgot password?</Link>
          </FormHelperText>
        </FormControl>

        <Button
          borderRadius={10}
          variant="solid"
          colorScheme="teal"
          width="full"
          onClick={handleSignInWithEmail}
        >
          Login
        </Button>
        <Center>
          <Stack flexDirection={"row"} spacing={6}>
            <Text>New to us?</Text>
            <Link color="blue.500" href="/signup">
              Sign Up
            </Link>
          </Stack>
        </Center>
      </Stack>
    </form>
  );
};
