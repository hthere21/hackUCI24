import React, { useEffect } from "react";
import { Box, Button, Flex, Heading, Spacer, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuth } from "./AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    // Check if there is a user stored in local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      updateUser(storedUser);
    }

    // Optional: Set up a listener for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        updateUser(currentUser);
        // Store the user in local storage
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        updateUser(null);
        // Remove the user from local storage
        localStorage.removeItem("user");
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [updateUser]);

  return (
    <>
      <Box top="0" left="0" right="0" zIndex="999" bg="white" boxShadow="sm">
        <Flex p={4}>
          <Spacer />
          <Center>
            <Heading size="lg" fontWeight="bold">
              ZotLease
            </Heading>
          </Center>
          <Spacer />

          <Button
            size="md"
            marginRight={10}
            borderLeftRadius={3.3}
            borderRightRadius={3.3}
            fontSize={20}
            onClick={() => navigate(user ? "/profile" : "/login")}
          >
            {user ? "Profile" : "Login"}
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
