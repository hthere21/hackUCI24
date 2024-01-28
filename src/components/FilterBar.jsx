import React from "react";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

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

function FilterBar({ searchParameters }) {
  let parameters = searchParameters.searchParamsObject;
  const [type, setType] = useState(parameters.type || "");
  const [price, setPrice] = useState(parameters.price || 0);
  const [location, setLocation] = useState(parameters.city || "");
  const [start, setStart] = useState(parameters.start || "");
  const [end, setEnd] = useState(parameters.end || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (parameters.type) {
      setType(parameters.type);
    }
    if (parameters.price) {
      setPrice(parameters.price);
    }
    if (parameters.city) {
      setLocation(parameters.city);
    }
    if (parameters.start) {
      setStart(parameters.start);
    }
    if (parameters.end) {
      setEnd(parameters.end);
    }
  }, [parameters]);

  const handleFilterClicked = () => {
    let queryParams = [];

    if (location) {
      queryParams.push(`city=${encodeURIComponent(location)}`);
    }
    if (price) {
      queryParams.push(`price=${encodeURIComponent(price)}`);
    }
    if (type) {
      queryParams.push(`type=${encodeURIComponent(type)}`);
    }
    if (start) {
      queryParams.push(`start=${encodeURIComponent(start)}`);
    }
    if (end) {
      queryParams.push(`end=${encodeURIComponent(end)}`);
    }

    const queryString = queryParams.join("&");
    navigate(`/search/?${queryString}`);
  };

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
                  placeholder="Max Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                >
                  <option value={1000}>{"$1,000"}</option>
                  <option value={2000}>{"$2,000"}</option>
                  <option value={3000}>{"$3,000"}</option>
                  <option value={10000}>{"$3,000+"}</option>
                </Select>
              </FormControl>

              <FormControl>
                <Input
                  type="location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="date"
                  // selected={date}
                  value={start}
                  onChange={(e) => {
                    setStart(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="date"
                  // selected={date}
                  value={end}
                  onChange={(e) => {
                    setEnd(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
            <Button colorScheme="green" size="md" onClick={handleFilterClicked}>
              Filter
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default FilterBar;
