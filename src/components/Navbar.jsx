import React, { useEffect } from "react";
import { Box, Button, Flex, Heading, Spacer, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuth } from "./AuthContext";
import { SignoutButton } from "../components/SignoutButton";

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
          
          {/* Logout Button */}
          {user ? (
              <SignoutButton/>
            ) : (
              null
          )}

          <Spacer />
          
          {/* Logo and Brand Name */}
          <Center>
            <Heading size="lg" fontWeight="bold">
              ZotLease
            </Heading>
          </Center>

          <Spacer />

          {/* Menu Bar / Login */}
          {user ? (
            <>
              <Button
                size="md"
                marginRight={2}
                borderLeftRadius={3.3}
                borderRightRadius={3.3}
                fontSize={20}
                onClick={() => navigate("/home")}
              >
                Home
              </Button>
              <Button
                size="md"
                marginRight={2}
                borderLeftRadius={3.3}
                borderRightRadius={3.3}
                fontSize={20}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button
                size="md"
                marginRight={2}
                borderLeftRadius={3.3}
                borderRightRadius={3.3}
                fontSize={20}
                onClick={() => navigate("/manage-sublets")}
              >
                Manage Sublets
              </Button>
              <Button
                size="md"
                marginRight={2}
                borderLeftRadius={3.3}
                borderRightRadius={3.3}
                fontSize={20}
                onClick={() => navigate("/favorites")}
              >
                Favorites
              </Button>

              <Button
                size="md"
                marginRight={5}
                borderLeftRadius={3.3}
                borderRightRadius={3.3}
                fontSize={20}
                onClick={() => navigate("/post")}
              >
                Post
              </Button>
            </>
          ) : (
            <Button
              size="md"
              marginRight={5}
              borderLeftRadius={3.3}
              borderRightRadius={3.3}
              fontSize={20}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
