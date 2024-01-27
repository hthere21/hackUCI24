import React, { useEffect } from "react";
import { Box, Button, Flex, Heading, Spacer, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuth } from "./AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Avoid updating user in local storage if it's the same as the current user
    if (storedUser && storedUser.uid !== user?.uid) {
      updateUser(storedUser);
    }

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        updateUser(currentUser);

        // Avoid updating local storage if the user is the same
        if (currentUser.uid !== storedUser?.uid) {
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      } else {
        updateUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [user, updateUser]); // Include user and updateUser in the dependency array

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
