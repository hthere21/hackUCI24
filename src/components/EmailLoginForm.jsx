import React, { useEffect, useState } from "react";
import { auth, signInWithEmailAndPassword } from "../config/firebase";

import {
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const EmailLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);

  const toast = useToast();

  const handleSignInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "debug use only",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      navigate("/home");
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
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
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
          borderRadius={0}
          variant="solid"
          colorScheme="teal"
          width="full"
          onClick={handleSignInWithEmail}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};
