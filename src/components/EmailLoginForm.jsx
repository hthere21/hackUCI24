import React, { useEffect, useState } from "react";
import { auth, googleProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence} from '../config/firebase';

import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
  } from "@chakra-ui/react";
  
  import {
    useNavigate,
  } from "react-router-dom";
  
  import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);



export const EmailLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleShowClick = () => setShowPassword(!showPassword);

    return(
        <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="email" placeholder="email address"  onChange={(e) => setEmail(e.target.value)}/>
                  </InputGroup>
                </FormControl>

                <FormControl>

                  <InputGroup>

                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />

                    <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                    
                  </InputGroup>

                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>

                </FormControl>
                
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
                
              </Stack>
            </form>


    )
}