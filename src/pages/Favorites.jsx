import React from "react";
import Navbar from "../components/Navbar";

import { 
    Box, 
    Button, 
    Flex, 
    Heading, 
    Spacer, 
    Center 
} from "@chakra-ui/react";

function Favorites() {
    return (
        <>
            <Navbar />

            <Center>
                <Heading>
                    Favorites
                </Heading>
            </Center>
        </>
    );
}


export default Favorites
;
