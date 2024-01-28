import React, { useState } from "react";
import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/?city=${encodeURIComponent(inputValue)}`);
  };

  return (
    <>
      <InputGroup borderRadius={5} size="lg">
        <Input
          type="text"
          placeholder="Search for sublets in your city"
          border="1px solid #FFFFFF"
          color={"#9eadc1"}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* <NumberInput width="100%">
            <NumberInputField  placeholder="Zip code: e.g 92614" border="1px solid #FFFFFF"
          color={"#9eadc1"}/>
          </NumberInput> */}
        <InputRightAddon p={0} border="none">
          <Button
            size="md"
            marginLeft={10}
            marginRight={10}
            borderLeftRadius={0}
            borderRightRadius={3.3}
            fontSize={20}
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
