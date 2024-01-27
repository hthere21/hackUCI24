import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Spacer, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
    };

    checkUser();

    // Optional: Set up a listener for auth state changes
    // const unsubscribe = auth.onAuthStateChanged(checkUser);

    // Cleanup function to unsubscribe from listener when component unmounts
    // return unsubscribe;
  }, []);

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
