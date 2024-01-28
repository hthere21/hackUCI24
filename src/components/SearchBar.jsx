// import React, { ReactElement, ReactNode } from "react";
import React from "react";
import { Button, Input, InputGroup, InputRightAddon, NumberInput, NumberInputField } from "@chakra-ui/react";
// import { Search2Icon } from "@chakra-ui/icons";


export const SearchBar = () => {
  return (
    <>
      <InputGroup borderRadius={5} size="lg">
        {/* <Input
          type="text"
          placeholder="Zip code: e.g 92614"
          border="1px solid #FFFFFF"
          color={"#9eadc1"}
        /> */}
        
        <NumberInput width="100%">
            <NumberInputField  placeholder="Zip code: e.g 92614" border="1px solid #FFFFFF"
          color={"#9eadc1"}/>
          </NumberInput>
        <InputRightAddon p={0} border="none">
          <Button
            size="md"
            marginLeft={10}
            marginRight={10}
            borderLeftRadius={0}
            borderRightRadius={3.3}
            fontSize={20}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
