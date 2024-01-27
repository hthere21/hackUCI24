import React from "react";
import { Box, Button, Flex, Heading, Spacer, Center } from "@chakra-ui/react";
import {
  useNavigate,
} from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <Box  top="0" left="0" right="0" zIndex="999" bg="white" boxShadow="sm">
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
            onClick={()=>navigate("/login")}
          >
            Login
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
