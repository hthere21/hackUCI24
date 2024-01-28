import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
// import { doc, getDoc } from "firebase/firestore";
import { db, auth, doc, getDoc, onAuthStateChanged } from "../config/firebase";

import {
  Card,
  CardBody,
  Container,
  Box,
  Stack,
  Text,
  Divider,
  Heading,
  Button,
  Center,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Avatar,
  Input,
  Textarea,
  Flex
} from "@chakra-ui/react";

const CardUser = () => {
  // const { user, updateUser } = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [loading, setLoading] = useState(true);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  useEffect(() => {
    let isSubscribed = true; // To prevent state update if component unmounts

    // Set up auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isSubscribed) {
        // User is signed in, fetch user data
        fetchUserData(user).then((userData) => {
          setCurrentUser(userData);
          setLoading(false);
        });
      } else {
        // User is signed out or initial load with no user
        if (isSubscribed) {
          setLoading(false);
        }
      }
    });

    // Clean up subscription and listener
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (user) => {
    try {
      // Create a reference to the user's document in the 'users' collection

      const userDocRef = doc(db, "users", user.uid);

      // Fetch the document data from Firestore
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log(userData);
        return userData;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <>
      <Container maxW={"-moz-max-content"} p={0}>
        <Box
          position="relative"
          bgImage="url('https://images.squarespace-cdn.com/content/v1/5b60d4fa70e802968763e7f5/1576788003994-PYV0Z6XT8J0L3BJUXTQF/ME_towers_082919_0036_sz-2.jpg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          left={0}
          right={0}
          width="100vw"
          maxWidth="100%"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            bg="black"
            opacity={0.5}
            bgBlendMode="multiply"
          />
          <Center
            position="relative"
            zIndex={1}
            textAlign="center"
            display="flex"
            justifyContent="center"
            minH={80}
          >
            <Flex>
              {/* <Center marginTop={10}> */}
              <Heading
                color="white"
                textShadow={
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                }
                fontSize="5xl"
              >
                Profile
              </Heading>
              {/* </Center> */}

              {/* <Center> */}
              <Card
                maxW="lg"
                marginTop={10}
                padding={"5rem"}
                alignItems="center"
                borderRadius={15}
              >
                <Avatar size={"lg"} />
                <CardBody>
                  <Stack spacing="3" alignItems="center">
                    <Heading size="lg">
                      {currentUser.name ? currentUser.name : "No Name"}
                    </Heading>
                    <Text align="center">
                      sex: {currentUser.gender ? currentUser.gender : "N/A"} |
                      age: {currentUser.age ? currentUser.age : "N/A"}
                      <br />
                      email: {currentUser.email ? currentUser.email : "N/A"}
                      <br />
                      School:{" "}
                      {currentUser.university ? currentUser.university : "N/A"}
                      <br />
                      Bio:
                      <br />
                      {currentUser.bio ? currentUser.bio : "N/A"}
                    </Text>
                    <Button
                      onClick={() => {
                        setOverlay(<OverlayOne />);
                        onOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Modal
                      isCentered
                      isOpen={isOpen}
                      onClose={onClose}
                      initialFocusRef={initialRef}
                    >
                      {overlay}
                      <ModalContent>
                        <ModalHeader>Profile Settings</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input ref={initialRef} placeholder="Kayla Son" />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Gender</FormLabel>
                            <Input placeholder="Female" />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input placeholder="20" />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>School</FormLabel>
                            <Input placeholder="UC Irvine" />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Bio</FormLabel>
                            <Textarea placeholder="Enter a description about yourself." />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" onClick={onClose}>
                            Save Changes
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Stack>
                </CardBody>
                <Divider />
              </Card>
            </Flex>
          </Center>
          {/* </Center> */}
        </Box>
      </Container>
    </>
  );
};

export default CardUser;
