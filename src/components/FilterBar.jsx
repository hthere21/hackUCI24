import React from "react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  Input,
  Button,
  Select,
  Box,
  Flex,
  HStack,
  Text,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";

function FilterBar() {
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  console.log(
    `type: ${type}, price: ${price}, location: ${location}, date: ${date}`
  );
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <Box width="100%">
                <Text>I am looking for: </Text>
              </Box>
              <FormControl>
                <Select
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Apartments</option>
                  <option>Rooms</option>
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Prices"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                >
                  <option>United Arab Emirates</option>
                  <option>Nigeria</option>
                </Select>
              </FormControl>

              <FormControl>
                <Input
                  type="location"
                  placeholder="Location"
        
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="date"
                  // selected={date}
                  value={date}
                  onChange={(d) => {
                    setDate(d);
                  }}
                />
              </FormControl>
            </HStack>
            <Button colorScheme="green" size="md">
              Filter
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default FilterBar;
