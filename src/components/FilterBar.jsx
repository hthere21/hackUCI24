import React from "react";
import {
  FormControl,
  Input,
  Select,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function FilterBar() {
  return (
    <>
      {/* <Stack
        top="0"
        left="0"
        right="0"
        zIndex="999"
        bg="gray"
        boxShadow="sm"
        flexDirection={"row"}
      >
        <Flex p={4}>
          
        </Flex>
      </Stack> */}

      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              // as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box width="100%">
                <Text>I am looking for: </Text>
              </Box>
              <Select placeholder="">
                <option>Apartments</option>
                <option>Rooms</option>
                <option></option>
              </Select>
              {/* <FormControl> */}

              <Select placeholder="Prices">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              <Select placeholder="Date">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              <Input type="email" placeholder="location" textColor={"white"} />
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}

export default FilterBar;
