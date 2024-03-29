import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Heading,
  Spacer,
  Center,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
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
      <Box top="0" left="0" right="0" zIndex="999" bg="#EEEEE" boxShadow="md">
        <Flex p={4}>
          {/* Logout Button */}
          {user ? <SignoutButton /> : null}

          <Spacer />

          {/* Logo and Brand Name */}
          <Flex flexDirection={"row"}>
            <Center>
              <Image src={logo} width={20}></Image>
              <Link textDecoration={"none"}>
                <Heading
                  fontFamily={"Brush Script MT"}
                  size="2xl"
                  fontWeight="bold"
                  onClick={() => navigate("/allListings/:selectedListing")}
                >
                  ZotLease
                </Heading>
              </Link>
            </Center>
          </Flex>
          <Spacer />

          {/* Menu Bar / Login */}
          {user ? (
            <>
              <Button
                size="md"
                marginRight={2}
                borderRadius={10}
                fontSize={20}
                onClick={() => navigate("/home")}
              >
                Home
              </Button>
              <Button
                size="md"
                marginRight={2}
                borderRadius={10}
                fontSize={20}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button
                size="md"
                marginRight={2}
                borderRadius={10}
                fontSize={20}
                onClick={() => navigate("/manage-sublets")}
              >
                Manage Sublets
              </Button>
              <Button
                size="md"
                marginRight={2}
                borderRadius={10}
                fontSize={20}
                onClick={() => navigate("/favorites")}
              >
                Favorites
              </Button>

              <Button
                size="md"
                marginRight={5}
                borderRadius={10}
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
              borderRadius={10}
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
