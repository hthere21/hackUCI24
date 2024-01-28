import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Input,
  Select,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function FilterBar() {
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  // console.log(queryData);
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <Box width="100%">
                <Text>I am looking for: </Text>
              </Box>
              <Select placeholder="">
                <option>Apartments</option>
                <option>Rooms</option>
                {/* <option></option> */}
              </Select>
              {/* <FormControl> */}

              <Select placeholder="Prices">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              {/* <Select placeholder="Date">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select> */}
              <Input type="location" placeholder="Location" />
              <Box backgroundColor={"gray"}>
                <DatePicker
                  isClearable
                  placeholder="Date"
                  maxDate={new Date()}
                  selected={date}
                  onChange={(d) => {
                    setDate(d);
                  }}
                />
              </Box>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default FilterBar;
