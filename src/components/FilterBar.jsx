import React from "react";
import { Flex, FormControl, Input, Select, Stack } from "@chakra-ui/react";

function FilterBar() {
  return (
    <>
      <Stack
        top="0"
        left="0"
        right="0"
        zIndex="999"
        bg="gray"
        boxShadow="sm"
        flexDirection={"row"}
      >
        <Flex p={4}>
          <form>
            <FormControl>
              <Input type="email" placeholder="location" textColor={"white"} />
            </FormControl>
            <Select placeholder="Beds">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
            <Select placeholder="Prices">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
            <Select placeholder="Date">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </form>
        </Flex>
      </Stack>
    </>
  );
}

export default FilterBar;
