import * as React from "react";

import { Container, Text, Button, Heading } from "@chakra-ui/react";
import CardLogin from "../components/login/CardLogin";
import { auth } from "../config/firebase";

function Login() {
  return (
    <>
      <CardLogin />
    </>
  );
}

export default Login;
