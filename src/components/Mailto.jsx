import React from "react";
import { Link } from "react-router-dom";
import {Button} from "@chakra-ui/react";

const Mailto = ({ mailto, label }) => {
    return (
        <Button variant="solid" colorScheme="teal">
            <Link
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
            >
                {label}
            </Link>
        </Button>
    );
};

export default Mailto;